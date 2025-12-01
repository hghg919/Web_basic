import React from "react";
import Comment from "./Comment";

const comments = [
  {
    name:"홍일동",
    comment: "안녕하세요 일동입니다",
  },
  {
    name:"홍이동",
    comment: "안녕하세요 홍이동입니다",
  },
  {
    name:"홍삼동",
    comment: "안녕하세요 홍삼동입니다",
  },
   {
    name:"홍사동",
    comment: "안녕하세요 홍사동입니다",
  },
  {
    name:"홍오동",
    comment: "안녕하세요 홍오동입니다",
  },
];

function CommentList(props){
  return (
    <div>
      {comments.map((comment)=>{
        return (
          <Comment name={comment.name} comment={comment.comment}/>
        );
      })}
    </div>
  );
}

// function CommentList(props){
//   return (
//     <div>     
//           <Comment name={"홍길동"} comment={"길동입니다"}/>
//           <Comment name={"유재석"} comment={"재석입니다"}/>        
//           <Comment name={"홍이동"} comment={"이동입니다"}/>                
//     </div>
//   );
// }

// function CommentList(props){
//   return (
//     <div>     
//           <Comment name={"홍길동"} comment={"길동입니다"}/>        
//     </div>
//   );
// }

// function CommentList(props){
//   return(
//     <div>
//       <Comment/>
//     </div>
//   );
// }

export default CommentList;