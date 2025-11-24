import React from "react";
function Book(props){
    return(
        <div>
            <h1>{`이책의 이름은 ${props.name} 입니다.`}</h1>
            <h2>{`이책은 총 ${props.numOfpage}페이지로 되어있음`}</h2>
        </div>
    )
}
export default Book;