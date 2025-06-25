import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Static translation resources
const resources = {
  en: {
    common: {
      navigation: {
        dashboard: "Dashboard",
        quizzes: "Quizzes",
        announcements: "Announcements",
        courses: "Courses",
        gradebook: "Gradebook",
        schedule: "Schedule",
        performance: "Performance",
      },
      auth: {
        login: "Login",
        register: "Register",
        logout: "Logout",
        email: "Email",
        password: "Password",
        name: "Name",
        fullName: "Full Name",
        confirmPassword: "Confirm Password",
        forgotPassword: "Forgot Password?",
        dontHaveAccount: "Don't have an account?",
        alreadyHaveAccount: "Already have an account?",
        signUp: "Sign Up",
        signIn: "Sign In",
      },
      common: {
        save: "Save",
        cancel: "Cancel",
        delete: "Delete",
        edit: "Edit",
        close: "Close",
        submit: "Submit",
        loading: "Loading...",
        error: "Error",
        success: "Success",
        warning: "Warning",
        info: "Information",
        confirm: "Confirm",
        yes: "Yes",
        no: "No",
        back: "Back",
        next: "Next",
        previous: "Previous",
        search: "Search",
        filter: "Filter",
        sort: "Sort",
        refresh: "Refresh",
        clear: "Clear",
        language: "Language",
      },
      dashboard: {
        welcome: "Welcome back",
        recentActivity: "Recent Activity",
        upcomingTasks: "Upcoming Tasks",
        quickActions: "Quick Actions",
        announcements: "Latest Announcements",
        whatsDue: "What's Due",
      },
      exam: {
        title: "EXAMS TIME",
        description:
          "Here we are. Are you ready to fight? Don't worry, we prepared some tips to be ready for your exams.",
        quote: "Nothing happens until something moves",
        quoteAuthor: "Albert Einstein",
        viewTips: "View exams tips",
      },
    },
  },
  ar: {
    common: {
      navigation: {
        dashboard: "لوحة التحكم",
        quizzes: "الاختبارات",
        announcements: "الإعلانات",
        courses: "المقررات",
        gradebook: "دفتر الدرجات",
        schedule: "الجدول الزمني",
        performance: "الأداء",
      },
      auth: {
        login: "تسجيل الدخول",
        register: "إنشاء حساب",
        logout: "تسجيل الخروج",
        email: "البريد الإلكتروني",
        password: "كلمة المرور",
        name: "الاسم",
        fullName: "الاسم الكامل",
        confirmPassword: "تأكيد كلمة المرور",
        forgotPassword: "نسيت كلمة المرور؟",
        dontHaveAccount: "ليس لديك حساب؟",
        alreadyHaveAccount: "لديك حساب بالفعل؟",
        signUp: "إنشاء حساب",
        signIn: "تسجيل الدخول",
      },
      common: {
        save: "حفظ",
        cancel: "إلغاء",
        delete: "حذف",
        edit: "تعديل",
        close: "إغلاق",
        submit: "إرسال",
        loading: "جاري التحميل...",
        error: "خطأ",
        success: "نجح",
        warning: "تحذير",
        info: "معلومات",
        confirm: "تأكيد",
        yes: "نعم",
        no: "لا",
        back: "السابق",
        next: "التالي",
        previous: "السابق",
        search: "بحث",
        filter: "تصفية",
        sort: "ترتيب",
        refresh: "تحديث",
        clear: "مسح",
        language: "اللغة",
      },
      dashboard: {
        welcome: "مرحباً بعودتك",
        recentActivity: "النشاط الأخير",
        upcomingTasks: "المهام القادمة",
        quickActions: "إجراءات سريعة",
        announcements: "أحدث الإعلانات",
        whatsDue: "المطلوب إنجازه",
      },
      exam: {
        title: "وقت الامتحانات",
        description:
          "ها نحن هنا. هل أنت مستعد للقتال؟ لا تقلق، لقد أعددنا بعض النصائح لتكون مستعداً لامتحاناتك.",
        quote: "لا شيء يحدث حتى يتحرك شيء ما",
        quoteAuthor: "ألبرت أينشتاين",
        viewTips: "عرض نصائح الامتحانات",
      },
    },
  },
};

// Supported languages
export const supportedLanguages = {
  en: { nativeName: "English", dir: "ltr" },
  ar: { nativeName: "العربية", dir: "rtl" },
};

export const supportedLngs = Object.keys(supportedLanguages);

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // default language
  fallbackLng: "en",

  // Namespace
  defaultNS: "common",
  ns: ["common"],

  // Interpolation options
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18n;
