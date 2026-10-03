import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { check } from "k6";
import http from "k6/http";

// URL base de nuestra aplicación de pizzas
const baseUrl = "http://localhost:3000/api/v1/pizzas";

export const options = {
    vus: 1,
    iterations: 1
};

export default function () {
 
    // 1. POST - Crear una pizza
 

    const pizza = {
        id: 20,
        nombre: "Pizza K6",
        ingredientes: "Queso, pepperoni, salsa de tomate y cebolla"
    };

    const responsePost = http.post(
        baseUrl,
        JSON.stringify(pizza),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    check(responsePost, {
        "POST - Crear pizza - status 201": (r) => r.status === 201
    });

 
    // 2. GET - Obtener la pizza
   

    const responseGet = http.get(baseUrl + "/20");

    check(responseGet, {
        "GET - Obtener pizza - status 200": (r) => r.status === 200
    });


   
    // 3. PUT - Actualizar la pizza
    

    const pizzaActualizada = {
        nombre: "Pizza K6 Especial",
        ingredientes: "Queso, pepperoni, salsa BBQ, cebolla y extra queso"
    };

    const responsePut = http.put(
        baseUrl + "/20",
        JSON.stringify(pizzaActualizada),
        {
            headers: {
                "Content-Type": "application/json"
            }
        }
    );

    check(responsePut, {
        "PUT - Actualizar pizza - status 202": (r) => r.status === 202
    });


    
    // 4. DELETE - Eliminar la pizza
   

    const responseDelete = http.del(baseUrl + "/20");

    check(responseDelete, {
        "DELETE - Eliminar pizza - status 200": (r) => r.status === 200
    });
}


 
// Generar reporte HTML

export function handleSummary(data) {
    return {
        "k6/index.html": htmlReport(data)
    };
}