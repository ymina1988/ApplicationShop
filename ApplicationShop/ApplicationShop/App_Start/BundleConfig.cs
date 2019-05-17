using BundleTransformer.Core.Builders;
using BundleTransformer.Core.Orderers;
using BundleTransformer.Core.Resolvers;
using BundleTransformer.Core.Transformers;
using System.Web.Optimization;

namespace ApplicationShop
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.UseCdn = true;

            var nullBuilder = new NullBuilder();
            var styleTransformer = new StyleTransformer();
            var scriptTransformer = new ScriptTransformer();
            var nullOrderer = new NullOrderer();

            BundleResolver.Current = new CustomBundleResolver();

            #region LTR Css Admin Dashboard
            //Style Bundles
            var bootstrapStylesBundle = new Bundle("~/bundles/css/bootstrap");
            bootstrapStylesBundle.Include(
                "~/Content/beyond/assets/css/bootstrap.min.css");
            bootstrapStylesBundle.Builder = nullBuilder;
            bootstrapStylesBundle.Transforms.Add(styleTransformer);
            bootstrapStylesBundle.Orderer = nullOrderer;
            bundles.Add(bootstrapStylesBundle);

            var beyondStylesBundle = new Bundle("~/bundles/css/beyond");
            beyondStylesBundle.Include(
                "~/Content/beyond/assets/css/beyond.min.css",
                "~/Content/beyond/assets/css/demo.min.css",
                "~/Content/beyond/assets/css/font-awesome.min.css",
                "~/Content/beyond/assets/css/typicons.min.css",
                "~/Content/beyond/assets/css/weather-icons.min.css",
                "~/Content/beyond/assets/css/animate.min.css");
            beyondStylesBundle.Builder = nullBuilder;
            beyondStylesBundle.Transforms.Add(styleTransformer);
            beyondStylesBundle.Orderer = nullOrderer;
            bundles.Add(beyondStylesBundle);
            #endregion

            #region RTL Css Admin Dashboard
            var bootstrapRtlStylesBundle = new Bundle("~/bundles/css/bootstrap-rtl");
            bootstrapRtlStylesBundle.Include(
                "~/Content/beyond/assets/css/bootstrap-rtl.min.css");
            bootstrapRtlStylesBundle.Builder = nullBuilder;
            bootstrapRtlStylesBundle.Transforms.Add(styleTransformer);
            bootstrapRtlStylesBundle.Orderer = nullOrderer;
            bundles.Add(bootstrapRtlStylesBundle);

            var beyondRtlStylesBundle = new Bundle("~/bundles/css/beyond-rtl");
            beyondRtlStylesBundle.Include(
                "~/Content/beyond/assets/css/custom.min.css",
                "~/Content/beyond/assets/css/beyond-rtl.min.css",
                "~/Content/beyond/assets/css/demo.min.css",
                "~/Content/beyond/assets/css/font-awesome.min.css",
                "~/Content/beyond/assets/css/typicons.min.css",
                "~/Content/beyond/assets/css/weather-icons.min.css",
                "~/Content/beyond/assets/css/animate.min.css",
                "~/Content/beyond/assets/css/toaster/v2.1.3/toastr.min.css",
                "~/Content/beyond/assets/css/pnotify.custom.min.css",
                "~/Scripts/alertifyjs/css/alertify.rtl.min.css",
                "~/Content/beyond/assets/js/chosen/chosen.min.css",
                "~/Scripts/DataTables-1.10.11/media/css/dataTables.bootstrap.min.css",
                "~/Scripts/jqueryConfirm/jquery-confirm.min.css"
                );
            beyondRtlStylesBundle.Builder = nullBuilder;
            beyondRtlStylesBundle.Transforms.Add(styleTransformer);
            beyondRtlStylesBundle.Orderer = nullOrderer;
            bundles.Add(beyondRtlStylesBundle);

            var pluginsBundleCss = new Bundle("~/bundles/css/plugins");
            pluginsBundleCss.Include(
                  "~/Content/beyond/assets/js/multiselectcheckbox/bootstrap-multiselectcheckbox.min.css"
                  );
            pluginsBundleCss.Builder = nullBuilder;
            pluginsBundleCss.Transforms.Add(styleTransformer);
            pluginsBundleCss.Orderer = nullOrderer;
            bundles.Add(pluginsBundleCss);

            var dropzonesBundle = new StyleBundle("~/Content/dropzonescss");
            dropzonesBundle.Include(
                     "~/Scripts/dropzone/dist/min/basic.min.css",
                     "~/Scripts/dropzone/dist/min/dropzone.min.css");

            dropzonesBundle.Builder = nullBuilder;
            dropzonesBundle.Transforms.Add(styleTransformer);
            dropzonesBundle.Orderer = nullOrderer;
            bundles.Add(dropzonesBundle);
            #endregion

            #region JS Admin Dashboard
            //Script Bunldes
            var skinBundle = new Bundle("~/bundles/js/skin");
            skinBundle.Include("~/Content/beyond/assets/js/skins.min.js");
            skinBundle.Builder = nullBuilder;
            skinBundle.Transforms.Add(scriptTransformer);
            skinBundle.Orderer = nullOrderer;
            bundles.Add(skinBundle);
            var jQueryBundle = new Bundle("~/bundles/js/jquery");
            jQueryBundle.Include("~/Content/beyond/assets/js/jquery.min.js");
            jQueryBundle.Builder = nullBuilder;
            jQueryBundle.Transforms.Add(scriptTransformer);
            jQueryBundle.Orderer = nullOrderer;
            bundles.Add(jQueryBundle);
            var bootstrapBundle = new Bundle("~/bundles/js/bootstrap");
            bootstrapBundle.Include(
                  "~/Content/beyond/assets/js/bootstrap.min.js",
                  "~/Content/beyond/assets/js/slimscroll/jquery.slimscroll.min.js");
            bootstrapBundle.Builder = nullBuilder;
            bootstrapBundle.Transforms.Add(scriptTransformer);
            bootstrapBundle.Orderer = nullOrderer;
            bundles.Add(bootstrapBundle);
            var beyondBundle = new Bundle("~/bundles/js/beyond");
            beyondBundle.Include(
                  "~/Content/beyond/assets/js/beyond.min.js",
                  "~/Content/beyond/assets/js/toastr/v2.1.3/toastr.min.js",
                  "~/Scripts/alertifyjs/alertify.min.js",
                  "~/Content/beyond/assets/js/tagsinput/bootstrap-tagsinput.min.js",
                  "~/Content/beyond/assets/js/chosen/chosen.jquery.min.js",
                  "~/Scripts/pnotify.custom.min.js",
                  "~/Content/beyond/assets/js/select2/js/select2.min.js",
                  "~/Scripts/DataTables-1.10.11/media/js/jquery.dataTables.min.js",
                  "~/Scripts/DataTables-1.10.11/media/js/dataTables.bootstrap.min.js",
                  "~/Scripts/CustomScripts/DataTableInit.min.js",
                  "~/Content/beyond/assets/js/custom-admin.min.js",
                  "~/Scripts/jqueryConfirm/jquery-confirm.min.js"
                  );
            beyondBundle.Builder = nullBuilder;
            beyondBundle.Transforms.Add(scriptTransformer);
            beyondBundle.Orderer = nullOrderer;
            bundles.Add(beyondBundle);

            var PluginsBundlejs = new Bundle("~/bundles/js/plugins");
            PluginsBundlejs.Include(
                  "~/Content/beyond/assets/js/jquery.mask.min.js",
                  "~/Content/beyond/assets/js/multiselectcheckbox/bootstrap-multiselectcheckbox.min.js",
                  "~/Scripts/CustomScripts/Helpers/PNotifyModule.min.js",
                  "~/Scripts/jquery.blockUI.min.js",
                  "~/Scripts/spin.min.js",
                  "~/Scripts/AlertLoading/PAlert.min.js",
                  "~/Scripts/AlertLoading/PLoading.min.js"
                  );

            PluginsBundlejs.Builder = nullBuilder;
            PluginsBundlejs.Transforms.Add(scriptTransformer);
            PluginsBundlejs.Orderer = nullOrderer;
            bundles.Add(PluginsBundlejs);

            var PMaskBundlejs = new Bundle("~/bundles/js/pmask");
            PMaskBundlejs.Include(
                  "~/Scripts/inputMask/inputmask.min.js",
                  "~/Scripts/inputMask/inputmask.numeric.extensions.min.js",
                  "~/Scripts/inputMask/jquery.inputmask.min.js",
                  "~/Scripts/PMask/PMask.min.js",
                  "~/Scripts/PMask/PMask.js"
                  );

            PMaskBundlejs.Builder = nullBuilder;
            PMaskBundlejs.Transforms.Add(scriptTransformer);
            PMaskBundlejs.Orderer = nullOrderer;
            bundles.Add(PMaskBundlejs);

            var jQueryValBundle = new Bundle("~/bundles/js/jqueryval");
            jQueryValBundle.Include(
                 "~/Content/beyond/assets/js/jqueryval/jquery.unobtrusive-ajax.min.js",
                 "~/Content/beyond/assets/js/jqueryval/jquery.validate.min.js",
                 "~/Content/beyond/assets/js/jqueryval/jquery.validate.unobtrusive.min.js"
                 );
            jQueryValBundle.Builder = nullBuilder;
            jQueryValBundle.Transforms.Add(scriptTransformer);
            jQueryValBundle.Orderer = nullOrderer;
            bundles.Add(jQueryValBundle);
            #endregion


            #region Kendo JS and CSS

            //---------- Kendo JS ----------------
            var KendoJsBundle = new Bundle("~/bundles/js/KendoDefault");
            KendoJsBundle.Include(
                         "~/Scripts/kendo/2017/jquery.min.js",
                         "~/Scripts/kendo/2017/kendo.all.min.js",
                         "~/Scripts/kendo/2017/kendo.aspnetmvc.min.js",
                         "~/Scripts/kendo/2017/jszip.min.js",

                         "~/Scripts/modernizr-2.8.3.js",
                         "~/Scripts/kendo/2017/kendo.treelist.min.js",
                         "~/Scripts/kendo/2017/kendo.timezones.min.js",

                         "~/Scripts/kendo/2017/cultures/kendo.culture.fa.js",
                         "~/Scripts/kendo/2017/cultures/kendo.culture.fa-IR.js",                         
                         "~/Scripts/kendo/2017/messages/kendo.messages.en-US.js");
            KendoJsBundle.Builder = nullBuilder;
            KendoJsBundle.Transforms.Add(scriptTransformer);
            KendoJsBundle.Orderer = nullOrderer;
            bundles.Add(KendoJsBundle);
            //---------- Kendo CSS ---------------
            var KendoStylesBundle = new Bundle("~/bundles/css/KendoDefault");
            KendoStylesBundle.Include(
                    "~/Scripts/kendo/2017/kendo.rtl.min.css",
                    "~/Scripts/kendo/2017/kendo.common.min.css",                    
                    "~/Scripts/kendo/2017/kendo.mobile.all.min.css",
                    "~/Scripts/kendo/2017/kendo.dataviz.metro.min.css",
                    "~/Scripts/kendo/2017/kendo.metro.min.css",
                    "~/Scripts/kendo/2017/kendo.dataviz.default.min.css",
                    "~/Scripts/kendo/2017/kendo.default.min.css");
            KendoStylesBundle.Builder = nullBuilder;
            KendoStylesBundle.Transforms.Add(styleTransformer);
            KendoStylesBundle.Orderer = nullOrderer;
            bundles.Add(KendoStylesBundle);
            #endregion

            #region DatePicker & TimePicker

            bundles.Add(new ScriptBundle("~/bundles/js/DateTimePicker").Include(
                         "~/Content/beyond/assets/js/datetime/bootstrap-timepicker.js",
                         "~/Scripts/MdBootstrapPersianDateTimePicker/PDateTimePicker.js",
                         "~/Scripts/MdBootstrapPersianDateTimePicker/jalaali.js",
                         "~/Scripts/MdBootstrapPersianDateTimePicker/jquery.Bootstrap-PersianDateTimePicker.js"
                ));

            bundles.Add(new StyleBundle("~/bundles/css/DateTimePicker").Include(
                "~/Content/MdBootstrapPersianDateTimePicker/jquery.Bootstrap-PersianDateTimePicker.min.css"
                ));
            #endregion


            #region SEO Template Css and Js
            //-------------- CSS seo for front Layout ---------------------//
            #region ApplicationShop SEO Template CSS Main-Layout
            var StylesBundleFrontSiteLayout = new Bundle("~/unify/MainLayout");
            StylesBundleFrontSiteLayout.Include(
                /***************** CSS Global Compulsory ********************/
                "~/Content/unify/assets/plugins/bootstrap/css/bootstrap-rtl.min.css",
                "~/Content/unify/assets/css/css-rtl/shop.style-rtl.css",
                "~/Content/unify/assets/css/css-rtl/app-rtl.css",
                "~/Content/unify/assets/css/css-rtl/shop.plugins-rtl.css",
                "~/Content/unify/assets/css/css-rtl/shop.blocks-rtl.css",
                /***************** CSS Header and Footer****************/
                "~/Content/unify/assets/css/css-rtl/headers/headers-panberes.css",
                "~/Content/unify/assets/css/css-rtl/footers/footer-v4-rtl.css",
                /***************** CSS Implementing Plugins ******************/
                "~/Content/unify/assets/plugins/animate.css",
                "~/Content/unify/assets/plugins/line-icons/line-icons.css",
                "~/Content/unify/assets/plugins/font-awesome/css/font-awesome.min.css",
                "~/Content/unify/assets/plugins/scrollbar/css/jquery.mCustomScrollbar.css",
                /***************** CSS Page Style************************/
                "~/Content/unify/assets/css/css-rtl/blocks-rtl.css",
                "~/Content/unify/assets/css/css-rtl/theme-colors/purple.css",
                /***************** CSS RTL Customization ************************/
                "~/Content/unify/assets/css/css-rtl/rtl.css",
                "~/Content/unify/assets/css/css-rtl/custom-rtl.css",
                "~/Content/unify/assets/css/custom.css",
                "~/Content/unify/assets/plugins/owl-carousel/owl-carousel/owl.carousel.css",
                "~/Content/unify/assets/css/plugins/owl-carousel/owl-carousel/owl.theme.css",
                "~/Content/unify/assets/css/plugins/toaster/toastr.min.css"
                );
            StylesBundleFrontSiteLayout.Builder = nullBuilder;
            StylesBundleFrontSiteLayout.Transforms.Add(styleTransformer);
            StylesBundleFrontSiteLayout.Orderer = nullOrderer;
            bundles.Add(StylesBundleFrontSiteLayout);
            #endregion
            #region ApplicationShop SEO Template CSS Blog Layout
            var StylesBundleFrontblogLayout = new Bundle("~/unify/CSS/SkyForms");
            StylesBundleFrontblogLayout.Include(
                "~/Content/unify/assets/plugins/fancybox/source/jquery.fancybox.css",
                "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/css/sky-forms-rtl.css",
                "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/custom/custom-sky-forms-rtl.css",
               "~/Content/unify/assets/plugins/owl-carousel2/assets/owl.carousel.css",
               "~/Content/unify/assets/css/css-rtl/pages/portfolio-v1-rtl.css",
               "~/Content/unify/assets/css/css-rtl/plugins-rtl.css",
               "~/Content/unify/assets/plugins/hover-effects/css/hover-min.css",
               "~/Content/unify/assets/css/css-rtl/pages/shortcode_timeline2-rtl.css");
            StylesBundleFrontblogLayout.Builder = nullBuilder;
            StylesBundleFrontblogLayout.Transforms.Add(styleTransformer);
            StylesBundleFrontblogLayout.Orderer = nullOrderer;
            bundles.Add(StylesBundleFrontblogLayout);
            #endregion



            #region ApplicationShop SEO Template CSS Shop Layout
            var StylesBundleFrontShopLayout = new Bundle("~/Content/beyond/assets/css/shop");
            StylesBundleFrontShopLayout.Include(
                "~/Content/unify/assets/plugins/owl-carousel2/assets/owl.carousel.css",
                "~/Content/unify/assets/css/css-rtl/pages/log-reg-v3-rtl.css",
                "~/Content/unify/assets/css/css-rtl/pages/page_contact.css",
               "~/Content/unify/assets/css/plugins/sky-forms-pro/skyforms/css/sky-forms-rtl.css",
               "~/Content/unify/assets/css/plugins/sky-forms-pro/skyforms/custom/custom-sky-forms-rtl.css");
            StylesBundleFrontShopLayout.Builder = nullBuilder;
            StylesBundleFrontShopLayout.Transforms.Add(styleTransformer);
            StylesBundleFrontShopLayout.Orderer = nullOrderer;
            bundles.Add(StylesBundleFrontShopLayout);
            #endregion
            #region ApplicationShop SEO Template CSS Forms Layout
            var StylesBundleFrontFormsLayout = new Bundle("~/Content/beyond/assets/css/forms");
            StylesBundleFrontFormsLayout.Include(
                "~/Content/unify/assets/css/css-rtl/pages/log-reg-v3-rtl.css",
                "~/Content/unify/assets/css/css-rtl/pages/page_contact.css",
                "~/Content/unify/assets/css/plugins/sky-forms-pro/skyforms/css/sky-forms-rtl.css",
               "~/Content/unify/assets/css/plugins/sky-forms-pro/skyforms/custom/custom-sky-forms-rtl.css");
            StylesBundleFrontFormsLayout.Builder = nullBuilder;
            StylesBundleFrontFormsLayout.Transforms.Add(styleTransformer);
            StylesBundleFrontFormsLayout.Orderer = nullOrderer;
            bundles.Add(StylesBundleFrontFormsLayout);
            #endregion
            #region ApplicationShop SEO Template CSS UserProfile Layout
            var StylesBundleUserProfileLayout = new Bundle("~/Content/beyond/assets/css/userprofile");
            StylesBundleUserProfileLayout.Include(
                "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/css/sky-forms-rtl.css",
                "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/custom/custom-sky-forms-rtl.css",
                "~/Content/unify/assets/plugins/brand-buttons/brand-buttons.css",
                "~/Content/unify/assets/plugins/brand-buttons/brand-buttons-inversed.css",
                "~/Content/unify/assets/css/css-rtl/pages/profile-rtl.css");
            StylesBundleUserProfileLayout.Builder = nullBuilder;
            StylesBundleUserProfileLayout.Transforms.Add(styleTransformer);
            StylesBundleUserProfileLayout.Orderer = nullOrderer;
            bundles.Add(StylesBundleUserProfileLayout);
            #endregion
            //-------------- JS seo for front Layout ----------------------//



            #region ApplicationShop SEO Template JS Main-Layout
            var ScriptBundleFrontSiteLayout = new Bundle("~/unify/Js/MainLayout");
            ScriptBundleFrontSiteLayout.Include(
                /************************** JS Global Compulsory ******************************/
                "~/Content/unify/assets/plugins/jquery/jquery.min.js",
                "~/Content/unify/assets/plugins/jquery/jquery-migrate.min.js",
                "~/Content/unify/assets/plugins/bootstrap/js/bootstrap.min.js",
                /************************* JS Implementing Plugins ****************************/
                "~/Content/unify/assets/plugins/back-to-top.js",
                "~/Content/unify/assets/plugins/smoothScroll.js",
                "~/Content/unify/assets/plugins/jquery.parallax.js",
                "~/Content/unify/assets/plugins/owl-carousel2/owl.carousel.min.js",
                "~/Content/unify/assets/plugins/owl-carousel/owl-carousel/owl.carousel.min.js",
                "~/Content/unify/assets/plugins/scrollbar/js/jquery.mCustomScrollbar.concat.min.js",
                /************************* JS Customization ***********************************/
                "~/Content/unify/assets/js/custom.js",
                 /************************* JS Page Level  *************************/
                 "~/Content/unify/assets/js/shop.app.js",
               "~/Content/unify/assets/js/plugins/owl-carousel-rtl-custom.js",
                "~/Content/unify/assets/js/plugins/toaster/toastr.min.js",
                "~/Content/unify/assets/js/ng_responsive_tables.js");
            ScriptBundleFrontSiteLayout.Builder = nullBuilder;
            ScriptBundleFrontSiteLayout.Transforms.Add(scriptTransformer);
            ScriptBundleFrontSiteLayout.Orderer = nullOrderer;
            bundles.Add(ScriptBundleFrontSiteLayout);
            #endregion
            #region RealPersion
            var StylesBundleRealPersion = new Bundle("~/unify/CSS/RealPersion");
            StylesBundleRealPersion.Include("~/Scripts/Realpersion/jquery.realperson.css");
            StylesBundleRealPersion.Builder = nullBuilder;
            StylesBundleRealPersion.Transforms.Add(styleTransformer);
            StylesBundleRealPersion.Orderer = nullOrderer;
            bundles.Add(StylesBundleRealPersion);

            var ScriptBundleRealperson = new Bundle("~/unify/Js/Realperson");
            ScriptBundleRealperson.Include("~/Scripts/Realpersion/jquery.plugin.js",
                                           "~/Scripts/Realpersion/jquery.realperson.js");
            ScriptBundleRealperson.Builder = nullBuilder;
            ScriptBundleRealperson.Transforms.Add(scriptTransformer);
            ScriptBundleRealperson.Orderer = nullOrderer;
            bundles.Add(ScriptBundleRealperson);
            #endregion


            #region ApplicationShop SEO Template JS Blog Layout
            var ScriptBundleFrontBlogSiteLayout = new Bundle("~/Content/beyond/assets/js/blog");
            ScriptBundleFrontBlogSiteLayout.Include(
                    /************************** JS Plugins ******************************/
                    "~/Content/unify/assets/plugins/fancybox/source/jquery.fancybox.pack.js",
                    "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/js/jquery.form.min.js",
                    "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/js/jquery.validate.min.js",
                    "~/Content/unify/assets/js/plugins/fancy-box-custom.js",
                    "~/Content/unify/assets/plugins/owl-carousel2/owl.carousel.min.js",
                    /************************** JS Scripts ******************************/
                    "~/Content/unify/assets/js/forms/login-custom.js",
                    "~/Content/unify/assets/js/plugins/owl-recent-works-rtl.js"
                  );
            ScriptBundleFrontBlogSiteLayout.Builder = nullBuilder;
            ScriptBundleFrontBlogSiteLayout.Transforms.Add(scriptTransformer);
            ScriptBundleFrontBlogSiteLayout.Orderer = nullOrderer;
            bundles.Add(ScriptBundleFrontBlogSiteLayout);
            #endregion
            #region ApplicationShop SEO Template JS Forms Layout
            var ScriptBundleFrontFormsSiteLayout = new Bundle("~/Content/beyond/assets/js/forms");
            ScriptBundleFrontFormsSiteLayout.Include(
                    /************************** JS Plugins ******************************/
                    "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/js/jquery.form.min.js",
                    "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/js/jquery.maskedinput.min.js",
                    "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/js/jquery-ui.min.js",
                    "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/js/jquery.validate.min.js"
                  );
            ScriptBundleFrontFormsSiteLayout.Builder = nullBuilder;
            ScriptBundleFrontFormsSiteLayout.Transforms.Add(scriptTransformer);
            ScriptBundleFrontFormsSiteLayout.Orderer = nullOrderer;
            bundles.Add(ScriptBundleFrontFormsSiteLayout);
            #endregion
            #region ApplicationShop SEO Template JS Shop Layout
            var ScriptBundleShopSiteLayout = new Bundle("~/Content/beyond/assets/js/shop");
            ScriptBundleShopSiteLayout.Include(
                    /************************** JS Plugins ******************************/
                    "~/Content/unify/assets/plugins/master-slider/quick-start/masterslider/masterslider.min.js",
                    "~/Content/unify/assets/plugins/master-slider/quick-start/masterslider/jquery.easing.min.js",
                    "~/Content/unify/assets/js/plugins/master-slider.js",
                    "~/Content/unify/assets/js/forms/product-quantity.js",
                    "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/js/jquery-ui.min.js"
                  );
            ScriptBundleShopSiteLayout.Builder = nullBuilder;
            ScriptBundleShopSiteLayout.Transforms.Add(scriptTransformer);
            ScriptBundleShopSiteLayout.Orderer = nullOrderer;
            bundles.Add(ScriptBundleShopSiteLayout);
            #endregion
            #region ApplicationShop SEO Template JS UserDashboard Layout
            var ScriptBundleShoppingCartLayout = new Bundle("~/Content/beyond/assets/js/shoppingcard");
            ScriptBundleShoppingCartLayout.Include(
                    /************************** JS Plugins ******************************/
                    "~/Content/unify/assets/plugins/jquery-steps/build/jquery.steps.js",
                    "~/Content/unify/assets/plugins/sky-forms-pro/skyforms/js/jquery.validate.min.js",
                    "~/Content/unify/assets/js/forms/page_login-custom.js",
                    "~/Content/unify/assets/js/plugins/stepWizard-custom.js",
                    "~/Content/unify/assets/js/forms/product-quantity.js"
                  );
            ScriptBundleShoppingCartLayout.Builder = nullBuilder;
            ScriptBundleShoppingCartLayout.Transforms.Add(scriptTransformer);
            ScriptBundleShoppingCartLayout.Orderer = nullOrderer;
            bundles.Add(ScriptBundleShoppingCartLayout);
            #endregion








            #endregion
            //----------------------------------------------------------------
            BundleTable.EnableOptimizations = true;
        }
    }
}