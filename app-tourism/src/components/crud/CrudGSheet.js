import React from 'react'

  export const sendGSheet = async (user) => {
     console.log("crudseheet00000000",user)
    try {
        const res = await fetch(
          "https://sheet.best/api/sheets/6861b095-1928-4975-aadc-d9b88e19dcf8",
          {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          }
            
        );
       
    } catch (error) {
        console.log(error)
        
    }
  }
