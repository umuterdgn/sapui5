sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox"
], function(Controller, MessageBox) {
    "use strict";
    return Controller.extend("com.shopadmintool.controller.App", {
        onNavToProfile: function() {
            this.getOwnerComponent().getRouter().navTo("profile");
        },
        onLogout: function() {
            // Çıkış işlemleri
            window.location.href = "#/";
        }
    });
});