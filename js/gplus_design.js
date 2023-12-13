document.addEventListener("DOMContentLoaded", function() {
    /* Sidebar Open */
    const menuBtn = document.querySelector('#menu'),
          sidebar = document.querySelector('.sidebar'),
          dBody = document.querySelector('.design');
    const imports = document.querySelectorAll('[data-event="import"]');
    const viewCont = document.querySelector('.container');
    
    menuBtn.addEventListener('click', function(e) {
        e.preventDefault();
    
        sidebar.classList.add('open');
    });
    /* Sidebar Close */
    document.addEventListener('click', function(e) {
        // menu 버튼 or Sidebar 클릭했을 때 이벤트 종료
        if (e.target.closest('.sidebar') || e.target.closest('#menu')) {
            return;
        }

        sidebar.classList.remove('open');
    });
    /* html imports */
    for (let i = 0; i < imports.length; i++) {    
        fetch(imports[i].href)
            .then(response => response.text())
            .then(data => {
                let wrapper = document.createElement('div');
                
                wrapper.classList.add('container__contents');
                wrapper.innerHTML = data;
                viewCont.appendChild(wrapper);
        });
    }
    /*
    *   Top button
    *
    */
    const topBtn = document.querySelector('#topBtn');

    window.addEventListener('scroll', handleScroll);
    topBtn.addEventListener("click", scrollToTop);
    
    function handleScroll() {        
        if (window.scrollY > 200) {
            topBtn.style.opacity = 1;
            topBtn.style.visibility = "visible";
        } else {
            topBtn.style.opacity = 0;
            topBtn.style.visibility = "hidden";
        }
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
    // Toast 관련 호출
    window.showToast = showToast;

    /*
    *   Function Name :         showToast(type, headMsg, bodyMsg)
    *   Function Description :  Toast 출력 (다중)
    *   
    *   @param type
    *   @param headMsg
    *   @param bodyMsg
    *
    */
    function showToast(type, headMsg, bodyMsg) {
        const toastContainer = document.querySelector('[data-toast-container]');
        const toastElem = document.createElement('div');
        
        toastElem.className = 'toast';
        toastElem.innerHTML = 
                '<div class="toast_header">'
            +       `${headMsg}`
            +   '</div>'
            +   '<div class="toast_body">'
            +       `${bodyMsg}`
            +   '</div>'
        ;

        switch(type) {
            // 정보
            case 'info':
                toastElem.style.backgroundColor = "#F8FFFF";
                toastElem.style.borderColor = "#ADD9E2";
                toastElem.querySelector('.toast_header').style.color = "#0E566C";
                toastElem.querySelector('.toast_body').style.color = "#0E566C";

                break;
            // 경고
            case 'warning':
                toastElem.style.backgroundColor = "#FFFAF3";
                toastElem.style.borderColor = "#CCBEA0";
                toastElem.querySelector('.toast_header').style.color = "#7A4D05";
                toastElem.querySelector('.toast_body').style.color = "#7A4D05";

                break;
            // 에러
            case 'error':
                toastElem.style.backgroundColor = "#FFF6F6";
                toastElem.style.borderColor = "#DB2828";
                toastElem.querySelector('.toast_header').style.color = "#973937";
                toastElem.querySelector('.toast_body').style.color = "#1E561F";

                break;
            // 성공
            case 'success':
                toastElem.style.backgroundColor = "#FCFFF5";
                toastElem.style.borderColor = "#21BA45";
                toastElem.querySelector('.toast_header').style.color = "#1E561F";
                toastElem.querySelector('.toast_body').style.color = "#7A4D05";

                break;
        }
        toastContainer.appendChild(toastElem);

        setTimeout(() => {
            toastElem.style.opacity = '1';
            toastElem.style.visibility = 'visible';
        }, 100);

        setTimeout(() => {
            toastElem.style.opacity = '0';
            toastElem.style.visibility = 'hidden';
            setTimeout(() => {
                toastContainer.removeChild(toastElem);
            }, 500);
        }, 3000);
    }
    /*
    *   Function Name :         tabs()
    *   Function Description :  탭
    *   
    *   @param 
    *    
    *
    *
    */
    function tabs() {
        const navTab = document.querySelector('.nav_tabs');
        const navItems = navTab.querySelectorAll('.nav_link');

        navItems.forEach((navItem) => {
            navItem.addEventListener('click', function(e) {
                e.preventDefault();
                // 모든 탭 active 클래스와 aria-current 속성 제거
                navItems.forEach((item) => {
                    item.classList.remove('active');
                    item.removeAttribute('aria-current');
                });
                // 현재 클릭 된 탭에 active 클래스와 aria-current 속성 추가
                this.classList.add('active');
                this.setAttribute('aria-current', 'page');
                // 클릭 된 탭의 내용
                const tab = this.textContent,
                      tabContents = document.querySelectorAll('.tab_content');

                tabContents.forEach((content) => {
                    content.style.display = 'none';
                });
                
                const activeTabContent = document.querySelector('#' + tab);

                if (activeTabContent) {
                    activeTabContent.style.display = 'block';
                } else {
                    console.log("해당 " + tab + "의 내용이 없습니다. ");
                }
            });
        });
        // 초기 상태에서 첫번째 탭 활성화
        if(navItems.length > 0) {
            navItems[0].click();
        } else {
            console.log("탭이 없습니다.");
        }
    }

    /*
    *   Function Name :         blockUI()
    *   Function Description :  blockUI 설정
    *   
    *   @param 
    *    
    *
    *
    */
    function blockUI() {
        document.body.style.cursor = 'wait';
        document.body.style.display = 'none';

        // loading 중
        const message = document.createElement('div');
        message.textContent = '로딩 중';
        message.style.position = "fixed";
        message.style.top = "0";
        message.style.left = "0";
        message.style.width = "100%";
        message.style.height = "100%";
        message.style.backgroundColor = "#000";
        message.style.zIndex = 9999;
        document.body.appendChild(message);

        // blockUI가 설정되면 이벤트 리스너 등록
        window.addEventListener("keydown", onKeyDown);
    }
    /*
    *   Function Name :         unblockUI()
    *   Function Description :  blockUI 해제
    *   
    *   @param 
    *    
    *
    *
    */
    function unblockUI() {
        // 화면 잠금 해제
        document.body.style.cursor = "";
        document.body.style.display = "";
    
        // loding 메시지 제거
        const message = document.querySelector('div');
        message.remove();
    
        // blockUI가 해제되면 이벤트 리스너 해제
        window.removeEventListener("keydown", onKeyDown);
    }
    /*
    *   Function Name :         onKeyDown()
    *   Function Description :  key 입력 시, event 해제
    *   
    *   @param event
    *    
    *
    *
    */
    function onKeyDown(event) {
        // ESC 키를 누르면 blockUI 해제
        if (event.keyCode === 27) {
            unblockUI();
        }
    }
});