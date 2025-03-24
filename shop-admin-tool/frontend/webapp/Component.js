sap.ui.define([
  "sap/ui/core/UIComponent"
], function (UIComponent) {
  "use strict";

  return UIComponent.extend("com.shopadmintool.Component", {
      metadata: {
          manifest: "json"
      },

      init: function () {
          UIComponent.prototype.init.apply(this, arguments);
          
          // Tema Yükleniyor
          sap.ui.getCore().applyTheme("sap_fiori_3");

          // Stil dosyasını yükle
          sap.ui.require(["sap/ui/dom/includeStylesheet"], function (includeStylesheet) {
              includeStylesheet("css/style.css");
          });

          // Router'ı Başlat
          this.getRouter().initialize();
          this.getRouter().navTo("login"); 
      },

      createContent: function () {
          return sap.ui.view({
              viewName: "com.shopadmintool.view.App", // Kendi view dosyanıza göre güncellendi
              type: "XML",
              id: "app"
          });
      }
  });
});
