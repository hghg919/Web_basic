/* ---------------------- 슬라이드 스크립트 ---------------------- */
/*모든 슬라이드(.slide) 요소를 가져옴 → 배열 형태로 저장
점 네비게이션(dot)을 넣을 영역 가져오기*/
const slides = document.querySelectorAll(".slide");   
const dotArea = document.getElementById("dotArea");

let index = 0;          /*현재 활성화 번호*/
let isPaused = false;   /*자동재생 정지 하는거*/
let timer;              /*타이머 변수*/

/* ----------------------점 네비 생성---------------------- */
slides.forEach((_, i) => {                              /*슬라이드 개수 만큼 반복하게 하는거*/
    const dot = document.createElement("div");          /*디아브이에 점 생성*/
    dot.classList.add("dot");                           /*dot 클래스 추가*/
    if (i === 0) dot.classList.add("active");           /*첫 번째 점음 기본적으로 활성호ㅓ*/
    dot.onclick = () => showSlide(i);                   /*점을 클릭시 그 화면 이동 가능*/
    dotArea.appendChild(dot);                           /*점을 저기 dotarea에 영역 추가*/ 
});
const dots = document.querySelectorAll(".dot");         /*점들을 다시 한번 다 모아서 배열로 저장하는거*/

/* ----------------------슬라이드 변경---------------------- */
function showSlide(i) {
    slides[index].classList.remove("active");           /*제거 하는거 저거 엑티*/ 
    dots[index].classList.remove("active");             /**/

    index = (i + slides.length) % slides.length;        /*인덱스를 아이로 업데이트 후 슬라이드 순환과 음수 방지*/

    slides[index].classList.add("active");              
    dots[index].classList.add("active");                /*노란색으로 처리*/
}

/* ----------------------자동재생---------------------- */
/*4초 마다 다음 슬라이드하고
페이지가 열리면 바로 자동재생*/
function startAutoSlide() {                                 
    timer = setInterval(() => showSlide(index + 1), 4000);
}
startAutoSlide();

/* ----------------------버튼 이벤트---------------------- */
document.getElementById("next").onclick = () => showSlide(index + 1);       /*버튼 클릭시 다음*/
document.getElementById("prev").onclick = () => showSlide(index - 1);       /*버튼 클릭시 다음*/    

document.getElementById("pauseBtn").onclick = () => {
    const pauseBtn = document.getElementById("pauseBtn");

    if (isPaused) {                     /*알사정지 상태일시 다시 재생*/                 
        startAutoSlide();
        pauseBtn.textContent = "⏸";    /*아이콘 변경*/ 
        isPaused = false;               /*상태값 변경*/
    } else {                            /*재생 중이면 일시 정지 하기*/
        clearInterval(timer);           
        pauseBtn.textContent = "▶";     /*아이콘 변경*/
        isPaused = true;                /*상태값 변경*/
    }
};

