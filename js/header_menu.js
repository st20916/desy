document.addEventListener("DOMContentLoaded", function() {
    const mainMenu = document.querySelector('[data-menu-position="header"]'),
          menuLinks = mainMenu.querySelectorAll('.main_link'),
          subMenus = document.querySelectorAll('.main_sub_menu');
    // 메인 메뉴 관련 Script
    menuLinks.forEach((menuLink) => {
        menuLink.addEventListener('mouseenter', function(e) {
            showSubMenu(e.target);
        });

        menuLink.addEventListener('mouseleave', function(e) {
            hideSubMenu(e.target);
        });

        menuLink.addEventListener('focus', function(e) {
            showSubMenu(e.target);
        });

        menuLink.addEventListener('blur', function(e) {
            hideSubMenu(e.target);
        });
    });
    // Side Menu Script
    const sideMenu = document.querySelector('[data-menu-position="side"]');

    sideMenu.querySelectorAll('.main_menu > li').forEach((mainMenuItem) => {
        mainMenuItem.addEventListener('click', function(e) {
            const subMenu = mainMenuItem.querySelector('.main_sub_menu');
            // 다른 메뉴에서 'show' 클래스 제거
            sideMenu.querySelectorAll('.show').forEach((shownItem) => {
                shownItem.classList.remove('show');
            });
            // 클릭한 메뉴에 'show' 클래스 추가
            mainMenuItem.classList.add('show');
            // 모든 2 Depth 메뉴를 닫습니다.
            sideMenu.querySelectorAll('.main_sub_menu').forEach((otherSubMenu) => {
                otherSubMenu.style.height = 0;
                otherSubMenu.style.opacity = 0;
                otherSubMenu.style.visibility = 'hidden';
            });
    
            if (subMenu) { // '.main_sub_menu'가 있는 경우
                subMenu.style.height = subMenu.scrollHeight + 'px';
                subMenu.style.opacity = 1;
                subMenu.style.visibility = 'visible';
            }
        });
    });
    /*
    *   Function Name :         showSubMenu(target)
    *   Function Description :  header 위치의 메뉴와 서브메뉴 관련 출력
    *   
    *   @param target
    *   
    *   
    *
    */
    function showSubMenu(target) {
        const subMenu = target.nextElementSibling;

        // 메인 메뉴 a 태그에 subMenu 있는 지 없는 지 판별
        if (subMenu && subMenu.classList.contains('main_sub_menu')) {
            // TODO : target의 색상은 디자인에 따라 변경 가능성 높음.
            target.style.backgroundColor = '#fff';
            target.style.color = '#3B4951';
            subMenu.classList.add('show');
            subMenu.style.height = subMenu.scrollHeight + 'px';
            subMenu.style.opacity = 1;
            subMenu.style.visibility = 'visible';

            subMenu.addEventListener('mouseenter', function(e) {
                target.style.backgroundColor = '#fff';
                target.style.color = '#3B4951';
                e.target.classList.add('show');
                e.target.style.opacity = 1;
                e.target.style.visibility = 'visible';
                e.target.style.height = e.target.scrollHeight + 'px';
            });
    
            subMenu.addEventListener('mouseleave', function(e) {
                target.style.backgroundColor = '#3B4951';
                target.style.color = '#fff';
                e.target.classList.remove('show');
                e.target.style.opacity = 0;
                e.target.style.visibility = 'hidden';
                e.target.style.height = 0;
            });
        }
    }
    /*
    *   Function Name :         hideSubMenu(target)
    *   Function Description :  header 위치의 메뉴와 서브메뉴 관련 숨기기
    *   
    *   @param target
    *   
    *   
    *
    */
    function hideSubMenu(target) {
        const subMenu = target.nextElementSibling;

        // 메인 메뉴 a 태그에 subMenu 있는 지 없는 지 판별
        if (subMenu && subMenu.classList.contains('main_sub_menu')) {
            target.style.backgroundColor = '#3B4951';
            target.style.color = '#fff';
            subMenu.classList.remove('show');
            subMenu.style.height = 0;
        }
    }
});