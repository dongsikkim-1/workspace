import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

// const routes = [

// ]

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes: [
    // 도서 관리 Start
    {
      path: "/Rent_Book",
      name: "도서 대여",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/BOOK/Rent_Book.vue"),
    },
    {
      path: "/Return_Book",
      name: "도서 반납",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/BOOK/Return_Book.vue"),
    },
    {
      path: "/Management_Book",
      name: "도서 관리",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/BOOK/Management_Book.vue"
        ),
    },
    {
      path: "/Status_Purchase",
      name: "구매 현황",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/BOOK/Status_Purchase.vue"
        ),
    },
    // 도서 관리 End

    // 정부 과제 Start
    {
      path: "/Status_Use",
      name: "사용 현황",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/GOVERMENT/Status_Use.vue"
        ),
    },
    {
      path: "/Status_Execution",
      name: "집행 현황",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/GOVERMENT/Status_Execution.vue"
        ),
    },
    {
      path: "/2",
      name: "과제 목록",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/GOVERMENT/Page2.vue"),
    },
    {
      path: "/Status_Business",
      name: "출장 현황",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/GOVERMENT/Status_Business.vue"
        ),
    },
    // 정부 과제 End

    // 관리자 기능 Start
    {
      path: "/Enrollment_Menu",
      name: "메뉴 등록",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ADMIN/Enrollment_Menu.vue"
        ),
    },
    {
      path: "/Enrollment_Menu2",
      name: "메뉴 등록2",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ADMIN/Enrollment_Menu2.vue"
        ),
    },
    {
      path: "/Enrollment_Menu3",
      name: "메뉴 등록3",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ADMIN/Enrollment_Menu3.vue"
        ),
    },
    {
      path: "/Management_Code",
      name: "코드 관리",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ADMIN/Management_Code.vue"
        ),
    },
    {
      path: "/Management_User",
      name: "사용자 관리",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ADMIN/Management_User.vue"
        ),
    },
    // 관리자 기능 End

    // 장비관리  Start
    {
      path: "/Status_Asset",
      name: "장비 현황",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ASSET/Status_Asset.vue"
        ),
    },
    {
      path: "/Enrollment_Asset",
      name: "장비 등록(본체)",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ASSET/Enrollment_Asset.vue"
        ),
      props: true,
    },
    {
      path: "/Asset_Out",
      name: "장비 출고",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/ASSET/Asset_Out.vue"),
    },
    {
      path: "/Equip_Move",
      name: "장비이동관리",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/ASSET/Equip_Move.vue"),
    },
    // {
    //   path: '/Equip_Move_Add',
    //   name: '장비 이동 추가/수정',
    //   props : true,
    //   component: () => import(/* webpackChunkName: "about" */ '../views/ASSET/Equip_Move_Add.vue')
    // },
    {
      //2020.10.13 MJH 추가
      path: "/Equip_InOut_Mnt",
      name: "장비 이동 등록 및 변경",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ASSET/Equip_InOut_Mnt.vue"
        ),
    },
    {
      path: "/Equip_Move_Add",
      name: "장비 이동 추가/수정",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ASSET/Equip_Move_Add.vue"
        ),
    },
    {
      path: "/Asset_Out_Add",
      name: "장비 출고 추가/수정",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ASSET/Asset_Out_Add.vue"
        ),
    },
    {
      path: "/Asset_In",
      name: "장비 입고",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/ASSET/Asset_In.vue"),
    },
    {
      path: "/Asset_In_Add",
      name: "장비 입고 추가/수정",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ASSET/Asset_In_Add.vue"
        ),
    },
    {
      path: "/Enrollment_Asset_Add",
      name: "장비(본체) 등록 추가",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ASSET/Enrollment_Asset_Add.vue"
        ),
    },
    {
      path: "/Enrollment_Asset_Add2",
      name: "장비(본체) 등록 추가2",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ASSET/Enrollment_Asset_Add2.vue"
        ),
    },
    {
      path: "/Asset_Monitoring",
      name: "장비 모니터링",
      props: true,
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/ASSET/Asset_Monitoring.vue"
        ),
    },
    // 장비관리 End

    // TEST 메뉴
    {
      path: "/Work_Order",
      name: "작업 지시",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/TEST/Work_Order.vue"),
    },
    {
      path: "/CHB_Test",
      name: "차현빈 테스트",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/TEST/CHB_Test.vue"),
    },
    {
      path: "/Test_main",
      name: "테스트 메뉴",
      props: true,
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/TEST/Test_main.vue"),
    },
    {
      path: "/SEMS_Map",
      name: "유해환경 맵",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/TEST/SEMS_Map.vue"),
    },
    {
      path: "/SEMS_Test",
      name: "유해환경 테스트",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/TEST/SEMS_Test.vue"),
    },
    {
      path: "/color_test",
      name: "컬러 테스트",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/TEST/Management_Book_test.vue"
        ),
    },
    {
      path: "/CJH_CHART_TEST",
      name: "CJH_CHART_TEST",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/TEST/CJH_CHART_TEST.vue"
        ),
    },
    {
      path: "/CJH_Scheduler_TEST",
      name: "CJH_Scheduler_TEST",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/TEST/CJH_Scheduler_TEST.vue"
        ),
    },
    {
      path: "/CJH_Calendar",
      name: "출근관리",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/TEST/CJH_Calendar.vue"
        ),
    },
    {
      path: "/FoodCheck",
      name: "FoodCheck",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/TEST/FoodCheck.vue"),
    },
    {
      path: "/food_select",
      name: "식사 메뉴",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/TEST/FOOD_SELECT.vue"),
    },
    {
      path: "/Food_Menu",
      name: "오늘의 메뉴",
      component: () =>
        import(/* webpackChunkName: "about" */ "../views/TEST/Food_Menu.vue"),
    },
    //프로젝트 관리
    {
      path: "/Project_List",
      name: "프로젝트 관리",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/PROJECT/Project_List.vue"
        ),
    },
    {
      path: "/Project_Status",
      name: "프로젝트 현황",
      component: () =>
        import(
          /* webpackChunkName: "about" */ "../views/PROJECT/Project_Status.vue"
        ),
    },
    {
      path: '/Risk_List',
      name: '위험 관리',
      component: () => import(/* webpackChunkName: "about" */ '../views/PROJECT/Risk_List.vue')
    },
    {
      path: '/Risk_Add',
      name: '위험 관리 상세',
      component: () => import(/* webpackChunkName: "about" */ '../views/PROJECT/Risk_Add.vue')
    }
  ],
});

export default router;
