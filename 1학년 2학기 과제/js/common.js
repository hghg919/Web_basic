/* 버튼 클릭 시 드롭다운 메뉴 열기/닫기 */
function toggleDropdown() {
    const dropdown = document.getElementById("myDropdown");
    if(dropdown) { // 에러 방지: 요소가 있을 때만 실행
        dropdown.classList.toggle("show");
    }
}

/* 메뉴 바깥쪽을 클릭하면 드롭다운 닫기 (안전한 버전) */
window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
});

/* ========================================= */
/* --- 💡 [추가] 언어 드롭다운 기능 --- */
/* ========================================= */

// 1. 버튼 클릭 시 메뉴 토글
function toggleLangDropdown() {
    const dropdown = document.getElementById("langDropdown");
    if (dropdown) {
        dropdown.classList.toggle("show-lang");
    }
}

// 2. 화면의 다른 곳을 클릭하면 닫기
window.addEventListener('click', function(event) {
    // 언어 버튼(.lang-dropbtn)이 아닌 다른 곳을 눌렀을 때
    if (!event.target.closest('.lang-dropbtn')) {
        const dropdown = document.getElementById("langDropdown");
        if (dropdown && dropdown.classList.contains('show-lang')) {
            dropdown.classList.remove('show-lang');
        }
    }
});