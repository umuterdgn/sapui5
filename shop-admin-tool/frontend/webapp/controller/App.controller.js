sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], function(Controller, MessageToast) {
    "use strict";

    return Controller.extend("com.shopadmintool.controller.App", {
        
        onInit: function() {
            const oUserModel = new sap.ui.model.json.JSONModel({
                username: "Admin User",
                userdate: new Date().toLocaleDateString()
              });
              this.getView().setModel(oUserModel, "user");
              
              // Router init
              this.getOwnerComponent().getRouter().initialize();
        },

        onMenuSelect: function(oEvent) {
            const sKey = oEvent.getParameter("listItem").getCustomData()[0].getKey();
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("home", {}, true);
            
            switch(sKey) {
              case 'home':
                oRouter.navTo("home");
                break;
              case 'accounts':
                oRouter.navTo("accounts");
                break;
              // Diğer routelar...
            }
          },
          onProfilePress: function() {
            this.getOwnerComponent().getRouter().navTo("profile");
          },

        onLogout: function() {
            // Çıkış işlemi
            MessageToast.show("Çıkış yapılıyor...");
        },

        getSplitApp: function() {
            return this.getView().byId("splitApp");
        }
        
    });
});