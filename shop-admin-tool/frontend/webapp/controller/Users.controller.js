sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel",
    "sap/m/MessageToast"
], function (Controller, JSONModel, MessageToast) {
    "use strict";

    return Controller.extend("com.shopadmintool.controller.Users", {
        onInit: function () {
            this.loadUsers();
        },

        loadUsers: function () {
            var oModel = new JSONModel();
            this.getView().setModel(oModel, "users");

            // Kullanıcıları API'den al
            fetch("http://localhost:5000/api/users") // Port numarasını kontrol edin
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => { throw new Error(text); });
                    }
                    return response.json();
                })
                .then(data => {
                    oModel.setData({ users: data });
                })
                .catch(error => {
                    MessageToast.show("Kullanıcılar yüklenirken hata oluştu.");
                    console.error("Error fetching users:", error);
                });
        },

        onAddUser: function () {
            this.byId("addUserDialog").open();
        },

        onConfirmAddUser: function () {
            var oView = this.getView();
            var sName = oView.byId("nameInput").getValue();
            var sSurname = oView.byId("surnameInput").getValue();
            var sEmail = oView.byId("emailInput").getValue();
            var sRole = oView.byId("roleInput").getSelectedKey();

            var newUser = { name: sName, surname: sSurname, email: sEmail, role: sRole };

            // Yeni kullanıcıyı API'ye gönder
            fetch("http://localhost:5000/api/users", { // Port numarasını kontrol edin
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newUser)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => { throw new Error(text); });
                    }
                    return response.json();
                })
                .then(data => {
                    MessageToast.show("Kullanıcı başarıyla eklendi.");
                    this.loadUsers(); // Kullanıcı listesini güncelle
                })
                .catch(error => {
                    MessageToast.show("Kullanıcı eklenirken hata oluştu.");
                    console.error("Error adding user:", error);
                });

            this.byId("addUserDialog").close();
        },

        onCancelAddUser: function () {
            this.byId("addUserDialog").close();
        },

        onUserItemPress: function (oEvent) {
            // Handle user item press
        },

        onEditUser: function (oEvent) {
            var oItem = oEvent.getSource().getParent();
            var oContext = oItem.getBindingContext("users");
            var oUser = oContext.getObject();

            // Kullanıcı bilgilerini dialog'a yükle
            this.byId("nameInput").setValue(oUser.name);
            this.byId("surnameInput").setValue(oUser.surname);
            this.byId("emailInput").setValue(oUser.email);
            this.byId("roleInput").setSelectedKey(oUser.role);

            // Dialog'u aç
            this.byId("addUserDialog").open();

            // Kullanıcıyı güncelleme işlemi
            this.byId("addUserDialog").attachAfterClose(function () {
                var sName = this.byId("nameInput").getValue();
                var sSurname = this.byId("surnameInput").getValue();
                var sEmail = this.byId("emailInput").getValue();
                var sRole = this.byId("roleInput").getSelectedKey();

                var updatedUser = { name: sName, surname: sSurname, email: sEmail, role: sRole };

                fetch(`http://localhost:5000/api/users/${oUser._id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(updatedUser)
                })
                    .then(response => {
                        if (!response.ok) {
                            return response.text().then(text => { throw new Error(text); });
                        }
                        return response.json();
                    })
                    .then(data => {
                        MessageToast.show("Kullanıcı başarıyla güncellendi.");
                        this.loadUsers(); // Kullanıcı listesini güncelle
                    })
                    .catch(error => {
                        MessageToast.show("Kullanıcı güncellenirken hata oluştu.");
                        console.error("Error updating user:", error);
                    });
            }.bind(this));
        },

        onDeleteUser: function (oEvent) {
            var oItem = oEvent.getSource().getParent();
            var oContext = oItem.getBindingContext("users");
            var oUser = oContext.getObject();

            if (!oUser._id) {
                MessageToast.show("Kullanıcı ID'si bulunamadı.");
                return;
            }

            console.log(`Deleting user with ID: ${oUser._id}`); // Hata ayıklama için ekleyin

            // Kullanıcıyı API'den sil
            fetch(`http://localhost:5000/api/users/${oUser._id}`, {
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(text => { throw new Error(text); });
                    }
                    return response.json();
                })
                .then(data => {
                    MessageToast.show("Kullanıcı başarıyla silindi.");
                    this.loadUsers(); // Kullanıcı listesini güncelle
                })
                .catch(error => {
                    MessageToast.show("Kullanıcı silinirken hata oluştu.");
                    console.error("Error deleting user:", error);
                });
        },

        onSideNavButtonPress: function () {
            var oToolPage = this.byId("toolPage");
            var bSideExpanded = oToolPage.getSideExpanded();

            oToolPage.setSideExpanded(!bSideExpanded);
        },

        onNavToHome: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("home");
        },

        onNavToUsers: function () {
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("users");
        }
    });
});