import React from "react";
import "./Paginadelogin.css"
import { Formik } from "formik";

class PaginaDeLogin extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit() {

    };

    // onSubmit={async (values, { resetForm }) => {
    //     console.log(values)
    //     const res = await fetch(`/api/animal`, {
    //       method: "POST",
    //       body: JSON.stringify(values),
    //       headers: { "Content-Type": "application/json" }
    //     })
    //     console.log(res.status)
    //     if (res.status === 201) {
    //       const { id } = await res.json()
    //       onCreate(id)
    //       resetForm()
    //     }
    //   }}

    render() {
        return (
            <div>
                <h2>Restaurante da Gertrudes</h2>
                <img className="logogarconet" src="logogarconet.png" />
                <Formik
                    initialValues = {{username: "", password: ""}}
                >
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" name="username" placeholder="Insira seu username"/>
                        <input type="password" name="password" placeholder="Insira sua palavra passe"/>
                        <button type="submit">Fazer login</button>
                    </form>
                </Formik>
                <a href="">Fazer registo</a>
            </div>
        )
    }
}

export default PaginaDeLogin