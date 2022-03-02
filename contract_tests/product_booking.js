/// <reference types="Cypress" />

//const {configThresholds, desktopConfig} = require('../config/lighthouse')

describe('Product booking flow ', function(){
  it.only('TC0009 - 200 - Product booking flow', () => {
      cy.fixture('TC0009').then((test_data)  => {
            var data_1 = test_data.datas.filter(e => e.data_id === 1)[0].data;
            var data_2 = test_data.datas.filter(e => e.data_id === 2)[0].data;
            var data_3 = test_data.datas.filter(e => e.data_id === 3)[0].data;
            var data_4 = test_data.datas.filter(e => e.data_id === 4)[0].data;
            var data_5 = test_data.datas.filter(e => e.data_id === 5)[0].data;
            var data_6 = test_data.datas.filter(e => e.data_id === 6)[0].data;
            var data_7 = test_data.datas.filter(e => e.data_id === 7)[0].data;
            cy.API_POST_session().as('step1 - post /sessions').its('.').then((response) => {
                expect(response.status).to.equal(200);
                var cck = response.body.cartContextKey;
                var offer = "Entertainment";
                var request_body_1 = data_1;
                request_body_1 = request_body_1.replace('${cck}',cck);
                request_body_1 = request_body_1.replace('${offer}',offer);
                cy.log('I want to see request_body:', request_body_1);
                cy.API_POST_basket(request_body_1).as('step2 - Select Entertainment to basket').its('.').then((response) => {
                    cy.log('======', JSON.stringify(response.body));
                    expect(response.status).to.equal(200);
                    var cck2 = response.body.cartContextKey;
                    var offer2 = "SkyQReceiver1";
                    var bundleContextKey2 = response.body.records.filter(e => e.id === "Platform")[0].addChildItem.filter(e => e.offer === "SkyQReceiver1")[0].bundleContextKey;
                    var parentLineItemKey2 = response.body.records.filter(e => e.id === "Platform")[0].addChildItem.filter(e => e.offer === "SkyQReceiver1")[0].parentLineItemKey;
                    var parentHierarchyPath2 = response.body.records.filter(e => e.id === "Platform")[0].addChildItem.filter(e => e.offer === "SkyQReceiver1")[0].parentHierarchyPath;

                    var request_body_2 = data_2;
                    request_body_2 = request_body_2.replace('${cck}',cck2);
                    request_body_2 = request_body_2.replace('${bundleContextKey}',bundleContextKey2);
                    request_body_2 = request_body_2.replace('${offer}',offer2);
                    request_body_2 = request_body_2.replace('${parentHierarchyPath}',parentHierarchyPath2);
                    request_body_2 = request_body_2.replace('${parentLineItemKey}',parentLineItemKey2);
                    cy.log('I want to see request_body:', request_body_2);
                    cy.API_POST_basket(request_body_2).as('======step 3.1  - Select cable=====').its('.').then((response) => {
                        expect(response.status).to.equal(200);
                        var cck3 = response.body.cartContextKey;
                        var offer3 = "SkyQReceiver1";
                        var code3 = "ReceiverType";
                        var value3 = "Kabel";
                        var bundleContextKey3 = response.body.records.filter(e => e.id === "Platform")[0].addChildItem.filter(e => e.offer === "SkyQReceiver1")[0].bundleContextKey;
                        var lineItemkey3 = response.body.records.filter(e => e.id === "Platform")[0].childItems.filter(e => e.id === "SkyQReceiver1")[0].line_item_key;

                        var request_body_3 = data_3;
                        request_body_3 = request_body_3.replace('${cck}',cck3);
                        request_body_3 = request_body_3.replace('${bundle_context_key}',bundleContextKey3);
                        request_body_3 = request_body_3.replace('${offer}',offer3);
                        request_body_3 = request_body_3.replace('${attributes.code}',code3);
                        request_body_3 = request_body_3.replace('${attributes.value}',value3);
                        request_body_3 = request_body_3.replace('${line_item_key}',lineItemkey3);
                        cy.log('I want to see request_body:', request_body_3);
                        cy.API_PUT_basket(request_body_3).as('======step 3.2  - Select cable=====').its('.').then((response) => {
                            expect(response.status).to.equal(200);
                            var cck4 = response.body.cartContextKey;
                            var bundle_context_key4 = response.body.records.filter(e => e.id === "Platform")[0].bundle_context_key;
                            var line_item_key4 = response.body.records.filter(e => e.id === "Platform")[0].line_item_key;
                            var faker = require('faker');
                            var randomEmail = 'cypress_' + faker.random.number({min:10, max:9999999});
                            var password4 = '0101';
                            var request_body_4 = data_4;
                            request_body_4 = request_body_4.replace('${cck}',cck4);
                            request_body_4 = request_body_4.replace('${PIN_SIGNUP}',password4);
                            request_body_4 = request_body_4.replace('${EMAIL_SIGNUP}',randomEmail);
                            cy.API_POST_signup(request_body_4).as('======step 4  - Signup=====').its('.').then((response) => {
                                expect(response.status).to.equal(200);
                                var access_token5 = 'Bearer '+ response.body.access_token;
                                var request_body_5 = data_5;
                                cy.API_POST_address(access_token5,request_body_5).as('======step 5  - Update address=====').its('.').then((response) => {
                                    expect(response.status).to.equal(200);
                                     var access_token6 = access_token5;
                                     var iban6 = 'DE' + faker.random.number({min:10000000000000000000, max:99999999999999999999}); // DE + random 20 number
                                     var request_body_6 = data_6;
                                     request_body_6 = request_body_6.replace('${iban}',iban6);
                                     cy.API_POST_mop(access_token6,request_body_6).as('======step 6  - Set customer method of payment=====').its('.').then((response) => {
                                        expect(response.status).to.equal(200);
                                        var cck7 = cck4;
                                        var request_body_7 = data_7;
                                        request_body_7 = request_body_7.replace('${cck}',cck7);
                                        cy.API_POST_summary(request_body_7).as('======step 7  - Summary of latest basket=====').its('.').then((response) => {
                                            expect(response.status).to.equal(200);

                                        });

                                     });
                                });
                            });
                        });
                    });
                });
            });
      });
  });
});