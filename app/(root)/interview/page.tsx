import React from 'react'
import Agent from "@/components/Agent";

function page() {
    return (
        <>
            <h3>Interview Generation</h3>

            <Agent userName='Your Name' userId='user1' type='generate'/>

        </>
    )
}

export default page
