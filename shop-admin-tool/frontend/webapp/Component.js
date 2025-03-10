sap.ui.define([
    "sap/ui/core/UIComponent"
  ], function (UIComponent) {
    "use strict";
    
    return UIComponent.extend("com.example.salesorder.Component", {
      metadata: {
        manifest: "json"
      },
  
      init: function () {
        UIComponent.prototype.init.apply(this, arguments);
        sap.ui.getCore().applyTheme("sap_fiori_3"); // Tema yüklensin
        jQuery.sap.includeStyleSheet("css/style.css"); // CSS Yükleniyor
        sap.ui.loader.config({ async: true });
        //this.getRouter().initialize();
      },
  
      createContent: function () {
        return sap.ui.view({
          viewName: "com.example.salesorder.view.Login",
          type: "XML",
          id: "app"
        });
      },
    });
  });
  