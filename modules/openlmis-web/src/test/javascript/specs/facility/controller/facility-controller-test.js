describe("Facility", function () {
  beforeEach(module('openlmis.services'));


  describe("Facility Controller", function () {

    var scope, $httpBackend, ctrl, routeParams, facility;

    beforeEach(inject(function ($rootScope, _$httpBackend_, $controller, $routeParams) {
      scope = $rootScope.$new();
      routeParams = $routeParams;
      $httpBackend = _$httpBackend_;
      var facilityReferenceData = {"facilityTypes":[
        {"type":"warehouse"}
      ], "programs":[
        {"code":"programCode", "id":"programId"}
      ], "geographicZones":[
        {"zoneId":"testId"}
      ], "facilityOperators":[
        {"operatorCode":"testCode"}
      ]};
      $rootScope.fixToolBar = function () {
      };
      ctrl = $controller(FacilityController, {$scope:scope, $routeParams:routeParams, facilityReferenceData:facilityReferenceData, facility:undefined});
      scope.facilityForm = {$error:{ pattern:"" }};
    }));

    it('should set facility reference data', function () {
      expect(scope.facilityTypes).toEqual([
        {"type":"warehouse"}
      ]);
      expect(scope.facilityOperators).toEqual([
        {"operatorCode":"testCode"}
      ]);
      expect(scope.geographicZones).toEqual([
        {"zoneId":"testId"}
      ]);
      expect(scope.programs).toEqual([
        {"code":"programCode", "id":"programId"}
      ]);
    });

    it('should give success message if save successful', function () {
      facility = {"code":"code", supportedPrograms:[]};
      $httpBackend.expectPOST('/facilities.json').respond(200, {"success":"Saved successfully", "facility":facility});
      scope.saveFacility();
      $httpBackend.flush();
      expect("Saved successfully").toEqual(scope.message);
      expect("").toEqual(scope.error);
    });

    it('should give error if save failed', function () {
      $httpBackend.expectPOST('/facilities.json').respond(404, {"error":"Save failed"});
      scope.saveFacility();
      $httpBackend.flush();
      expect("Save failed").toEqual(scope.error);
      expect("").toEqual(scope.message);
    });

    it('should give field validation error message if form has pattern errors', function () {
      scope.facilityForm.$error.pattern = "{}";
      scope.saveFacility();
      expect("There are some errors in the form. Please resolve them.").toEqual(scope.error);
      expect("").toEqual(scope.message);
      expect("true").toEqual(scope.showError);
    });

    it('should give field validation error message if form has required errors', function () {
      scope.facilityForm.$error.required = "{}";
      scope.saveFacility();
      expect("There are some errors in the form. Please resolve them.").toEqual(scope.error);
      expect("").toEqual(scope.message);
      expect("true").toEqual(scope.showError);
    });

    it('should not add program supported to facility if active program doesn\'t contain start date', function () {
      scope.facilityForm.$error.required = "{}";
      scope.facility.supportedPrograms = [
        {"code":"ARV", "name":"ARV", "description":"ARV", "active":true, "startDate" : "1/12/12"},
        {"code":"HIV", "name":"HIV", "description":"HIV", "active":true}
      ];
      scope.saveFacility();
      expect("There are some errors in the form. Please resolve them.").toEqual(scope.error);
      expect("").toEqual(scope.message);
      expect("true").toEqual(scope.showError);
    });

    it('should add program supported to facility', function () {
      scope.facility.supportedPrograms = [];
      var supportedProgram = {"code":"ARV", "name":"ARV", "description":"ARV", "active":true, "editedStartDate" : "1/12/12","program":{"id":1}};

      scope.addSupportedProgram(supportedProgram);

      expect(scope.facility.supportedPrograms[0].code).toEqual("ARV");
      expect(scope.facility.supportedPrograms[0].name).toEqual("ARV");
      expect(scope.facility.supportedPrograms[0].active).toEqual(true);
      expect(scope.facility.supportedPrograms[0].program.id).toEqual(1);
      expect(scope.supportedProgram).toBeUndefined();
    });

    it('should remove program supported to facility', function () {
      scope.facility.supportedPrograms = [];
      var arvProgram = {"code":"ARV", "name":"ARV", "description":"ARV", "active":true, "startDate" : "1/12/12","program":{"id":1}};
      scope.facility.supportedPrograms = [
        arvProgram,
        {"code":"HIV", "name":"HIV", "description":"HIV", "active":true,"program":{"id":2}}
      ];

      scope.removeSupportedProgram(arvProgram);

      expect(scope.facility.supportedPrograms.length).toEqual(1);
      expect(scope.facility.supportedPrograms[0].code).toEqual("HIV");
      expect(scope.facility.supportedPrograms[0].program.id).toEqual(2);

    });

    it('should edit start date', function () {
      window.program = {'startDate' : 2, 'editedStartDate' : 7};
      scope.setNewStartDate();
      expect(window.program.startDate).toEqual(window.program.editedStartDate);
    });

    it('should reset old start date', function () {
      window.program = {'startDate' : 2, 'editedStartDate' : 7};
      scope.resetOldStartDate();
      expect(window.program.editedStartDate).toEqual(window.program.startDate);
    });

  });

  describe("Facility Edit Controller", function () {
    beforeEach(inject(function ($rootScope, _$httpBackend_, $controller, $routeParams) {
      scope = $rootScope.$new();
      $rootScope.fixToolBar = function () {
      };
      $httpBackend = _$httpBackend_;
      routeParams = $routeParams;
      routeParams.facilityId = "1";
      var facilityReferenceData = {"facilityTypes":[
        {"type":"warehouse"}
      ], "programs":[
        {"code":"ARV", "name":"ARV", "description":"ARV", "active":true},
        {"code":"HIV", "name":"HIV", "description":"HIV", "active":true},
        {"code":"ABC", "name":"ABC", "description":"ABC", "active":false}
      ],
        "geographicZones":[
          {"zoneId":"testId"}
        ], "facilityOperators":[
          {"operatorCode":"testCode"}
        ]};
      facility = {"id":1, "code":"F1756", "name":"Village Dispensary", "description":"IT department", "gln":"G7645", "mainPhone":"9876234981",
        "fax":"fax", "address1":"A", "address2":"B", "geographicZone":{"id":1}, "facilityType":{"code":"warehouse"}, "catchmentPopulation":333,
        "latitude":22.1, "longitude":1.2, "altitude":3.3, "operatedBy":{"code":"NGO"}, "coldStorageGrossCapacity":9.9, "coldStorageNetCapacity":6.6,
        "suppliesOthers":true, "sdp":true, "hasElectricity":true, "online":true, "hasElectronicScc":true, "hasElectronicDar":null, "active":true,
        "goLiveDate":1352572200000, "goDownDate":-2592106200000, "satellite":true, "satelliteParentCode":null, "comment":"fc", "dataReportable":true,
        "supportedPrograms":[
          {"code":"ARV", "name":"ARV", "description":"ARV", "active":true,"program":{"id":1}},
          {"code":"HIV", "name":"HIV", "description":"HIV", "active":true,"program":{"id":1}}
        ], "modifiedBy":null, "modifiedDate":null};
      ctrl = $controller(FacilityController, {$scope:scope, $routeParams:routeParams, facilityReferenceData:facilityReferenceData, facility:facility});
      scope.facilityForm = {$error:{ pattern:"" }};

    }));

    it('should get facility if defined', function () {
      expect(scope.facility.supportedPrograms).toEqual([
        {"code":"ARV", "name":"ARV", "description":"ARV", "active":true,"program":{"id":1}},
        {"code":"HIV", "name":"HIV", "description":"HIV", "active":true,"program":{"id":1}}
      ]);
    });
  });
});