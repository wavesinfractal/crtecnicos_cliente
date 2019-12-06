import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './bootstrap/css/bootstrap.min.css';
// import $ from 'jquery';
// import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import RootSession from './App';
import * as serviceWorker from './serviceWorker';
import ApolloClient from "apollo-boost";
import { InMemoryCache } from "apollo-boost";

import { ApolloProvider } from "react-apollo";

// var Url = ''
// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  
//    Url = "http://192.168.1.10:8000/graphql" } else {

//    Url = "https://servercrtecnicos.herokuapp.com/graphql"
// }
console.log(process.env.NODE_ENV )

const client = new ApolloClient({
    // uri: Url ,
    // uri: "http://crtecnicosserver.herokuapp.com/graphql",
    uri: "http://192.168.1.10:8000/graphql" ,
    fetchOptions: {
      credentials: 'include'
    },
    request: operation => {
    const token = localStorage.getItem('token')
      operation.setContext({
          headers:{
            authorization: token
          }
       })
  
    },
  
  
  
    onError: ({ networkError, graphQLErrors }) => {
      console.log("Error de graphql", graphQLErrors);
      console.log("Error de red", networkError);
      return ( <div className="container gris mt-3">
        <h1>error</h1>
        </div>
        )
    },
    cache: new InMemoryCache({
      addTypename: false
    })
  });
ReactDOM.render(
    <ApolloProvider client={client}>       
    <RootSession/>
    </ApolloProvider>

, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
