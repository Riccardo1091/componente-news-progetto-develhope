import React from "react";

export function TestFetchStrapi() {

    // const standardHeaders = {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer 977b6648233716d0c43c7a41a3d09eb680ec57a67e7869725c9bce5ef8d817f5fc19e15e97fe72559444ef70e8fac6bb6d16cb47f793f6da995761ee23468776a0d183e0c3a69ca53d95b5344aa7e4d2445410a69519a5b8edf811d8e653db9da55283e28e8baed3bba3945ad8d7b29191c3e206d8ad9bb106765baafd070f8b`
    // };

    const elemento = {
        Titolo: "Titolo esempio 333rtyr",
        Descrizione: "Descrizione esempio 33333rtyrty",
        Url: "http://google.itttttgfhf"
    }

    // function getData() {
    //     // const formData = new FormData()
    //     // formData.append("data", JSON.stringify(elemento))
    //     console.log(formData)
    //     fetch("http://localhost:1337/api/segnalibros", {
    //         method: "POST",
    //         headers: {
    //             Accept: 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         // body: formData
    //         body: JSON.stringify({ data: elemento })
    //     })
    //         .then(res => console.log(res.json()))
    //         .catch(err => { console.log(err.message) })
    // }

    return (
        <div className="App">
            {/* <button className="btn" onClick={getData}>Click Me</button> */}
        </div>
    )
}