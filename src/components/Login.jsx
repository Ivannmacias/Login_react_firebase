import React,{useState,useCallback} from 'react'
import {db,auth} from '../firebase'

const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState(null)
    const [esRegistro, setEsRegistro] = useState(true)

    const procesarDatos = e =>{
        e.preventDefault()

        if(!email.trim()){
            setError('ingrese email')
            return
        }
        if(!password.trim()){
            setError('ingrese password')
            return
        }


        if(password.length<6){
            setError('password mayor a 6 caracteres')
            return
        }

        setError(null)
        console.log('paso todo');

        if(esRegistro){
            registrar()
        }
        else{
            login()

        }

    }

    const login = useCallback(async()=>{
        try {

           const res =  await auth.signInWithEmailAndPassword(email,password)
            console.log(res.user);
        } catch (error) {

            if(error.code ==='auth/invalid-email'){   
            setError('Email no valido');
            return
        }
        if(error.code ==='auth/user-not-found'){

            setError('Email no registrado')
            return
        }

        if(error.code ==='auth/wrong-password'){
            setError('password incorrecto')
            return
        }

            console.log(error);
        }


    },[email,password])

    const registrar = useCallback(async()=>{

        try {
            const res = await auth.createUserWithEmailAndPassword(email,password)
            await db.collection('usuarios').doc(res.user.email).set({
                email: res.user.email,
                uid: res.user.uid
            })
            console.log(res.user);

            setEmail('')
            setPassword('')
            setError(null)
        } catch (error) {
            console.log(error);
            if(error.code ==='auth/invalid-email'){
                setError('Email no valido')
            }
            if(error.code ==='auth/email-already-in-use'){
                setError('Email ya utilizado')
            }
            
        }

    },[email,password])

    return (
        <div className="mt-5">
                <h3 className="text-center">
                    {
                        esRegistro ? 'Registro de usuarios': 'Login de usuarios'
                    }
                </h3>
            <hr/>
            <div className="row justify-content-center">
                <div className="col-12 col-sm-8">

                <form onSubmit={procesarDatos}>
                    {
                        error && (<div className="alert alert-danger">{error}</div>)
                    }

                    <input type="email" 
                        className="form-control mb-2" 
                        placeholder="Ingrese correo"
                        onChange={e =>(setEmail(e.target.value))}
                        value={email}
                     />
                    
                    <input type="password" 
                        className="form-control mb-2" 
                        placeholder="Ingrese password"
                        onChange={e=>(setPassword(e.target.value))}
                        value={password}
                    />

                    <button 
                        className="btn btn-dark btn-block" 
                        type="submit">
                            {
                                esRegistro ? 'Registrarse': 'Acceder'
                            }
                    </button>

                    <button 
                        className="btn btn-info btn-block btn-sm" type="button"
                        onClick={()=>(setEsRegistro(!esRegistro))}>
                        {
                            esRegistro ? 'Ya tienes cuenta de usuario': ' no tienes cuenta'
                        }
                    </button>

                </form>

                </div>
            
            </div>
        </div>
    )
}

export default Login
