import React from "react";
import Book from "./Book";

function Library(props){
    return(
        <div>
            <Book name="html" numOfpage={300}/>
            <Book name="css" numOfpage={200}/>
            <Book name="javascript" numOfpage={500}/>
            <Book name="react" numOfpage={1000}/>
        </div>
    )
}
export default Library;