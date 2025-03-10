sap.ui.define([
  "sap/ui/core/mvc/Controller",
  "sap/m/MessageToast",
  "sap/ui/model/json/JSONModel"
], function(Controller, MessageToast, JSONModel) {
  "use strict";

  return Controller.extend("com.example.salesorder.view.Login", {
    
    // Mock Kullanıcı Listesi (Mevcut koda ek)
    _mockUsers: {
      "admin@example.com": {
        password: "admin123",
        name: "Admin User",
        role: "admin"
      },
      "user@example.com": {
        password: "user123",
        name: "Regular User",
        role: "user"
      }
    },

    onLoginPress: function() {
      var sEmail = this.byId("emailInput").getValue().trim();
      var sPassword = this.byId("passwordInput").getValue().trim();

      // 1. Önce Mock Kullanıcıları Kontrol Et (Yeni Eklendi)
      if(this._checkMockUsers(sEmail, sPassword)) {
        return;
      }

      // 2. Eğer mock kullanıcı değilse backend'e istek gönder (Orjinal Kod)
      fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: sEmail, password: sPassword })
      })
      .then(response => response.json())
      .then(data => this._handleLoginResponse(data))
      .catch(err => this._handleLoginError(err));
    },

    // Mock Kullanıcı Kontrol Fonksiyonu (Yeni Eklendi)
    _checkMockUsers: function(sEmail, sPassword) {
      const user = this._mockUsers[sEmail];
      
      if(user && user.password === sPassword) {
        // Kullanıcı modelini güncelle
        this.getOwnerComponent().setModel(
          new JSONModel({
            name: user.name,
            role: user.role,
            email: sEmail
          }), 
          "user"
        );
        
        MessageToast.show("Mock Login Successful!");
        this._navigateToHomePage();
        return true;
      }
      return false;
    },

    // Backend Yanıtı İşleme (Orjinal Kod)
    _handleLoginResponse: function(data) {
      if(data.token) {
        localStorage.setItem("jwtToken", data.token);
        MessageToast.show("Login successful!");
        this._navigateToHomePage();
      } else {
        MessageToast.show(data.error || "Login failed!");
      }
    },

    // Hata Yönetimi (Orjinal Kod)
    _handleLoginError: function(err) {
      MessageToast.show("Server error");
      console.error(err);
    },

    _navigateToHomePage: function() {
      const oRouter = this.getOwnerComponent().getRouter();
      oRouter.navTo("home"); // "app" route'una yönlendir
    },

    // Diğer fonksiyonlar aynı kaldı...
    onForgotPassword: function() { /* ... */ },
    onSignup: function() { /* ... */ }
  });
});