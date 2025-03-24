sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/json/JSONModel"
], function(Controller, MessageBox, JSONModel) {
    "use strict";
    
    return Controller.extend("com.shopadmintool.controller.Home", {
        onInit: function() {
            // Initialize with the side navigation expanded
            this._sideNavigationExpanded = true;
            
            // Mock users data for later use
            var oUsersModel = new JSONModel({
                users: [
                    { id: 1, name: "Ali", surname: "Yılmaz", email: "ali.yilmaz@example.com", role: "Admin" },
                    { id: 2, name: "Ayşe", surname: "Demir", email: "ayse.demir@example.com", role: "User" },
                    { id: 3, name: "Mehmet", surname: "Kaya", email: "mehmet.kaya@example.com", role: "User" }
                ]
            });
            
            this.getView().setModel(oUsersModel, "users");
            
            // Set the current view to dashboard
            this._currentView = "dashboard";
        },
        
        onToggleMenu: function() {
            var oToolPage = this.byId("toolPage");
            this._sideNavigationExpanded = !this._sideNavigationExpanded;
            
            // Toggle the side content visibility
            oToolPage.setSideExpanded(this._sideNavigationExpanded);
        },
        
        onNavToDashboard: function() {
            if (this._currentView !== "dashboard") {
                this.byId("pageContainer").to(this.byId("dashboardPage"));
                this._currentView = "dashboard";
            }
            
            // Close the side navigation on mobile
            if (sap.ui.Device.system.phone) {
                this.byId("toolPage").setSideExpanded(false);
                this._sideNavigationExpanded = false;
            }
        },
        
        onNavToUsers: function() {
            // Navigate to Users view
            this.getOwnerComponent().getRouter().navTo("users");
        },
        
        onNavToProfile: function() {
            // Navigate to Profile view
            this.getOwnerComponent().getRouter().navTo("profile");
        },
        
        onLogout: function() {
            // Clear token and navigate to login
            localStorage.removeItem("jwtToken");
            this.getOwnerComponent().getRouter().navTo("login");
        }
    });
});