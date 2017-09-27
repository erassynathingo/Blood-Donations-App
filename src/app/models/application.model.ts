
export interface DonationApplication {
  PersonalInformation: donorDetails;
  HealthInformation: healthInformation;


}

export interface donorDetails {
  title: string;
  firstName: string;
  lastName: string;
  maidenName: string;
  dateOfBirth: Date;
  gender: string;
  language: string;
  country: string;
  populationGroup: string;
  postalAddress: string;
  homeAddress: string;
  workAddress: string;
  homeNumber: numberFormat;
  workNumber: numberFormat;
  cellNumber: numberFormat;
  email: string;
  occupation: string;
  familyDoctor: otherPerson;
  emergencyContact: otherPerson;
  lastDonationInNamibia: {
    namibia: boolean;
    previousLocationDetails:{
      location: string;
      date: Date;
      previousAddress: string;
      howManyDonationGiven: number;
    }
  }

}

export interface numberFormat {
  code: number;
  number: number;
}
export interface otherPerson{
  firstName: string;
  lastName: string;
  contactNumber: numberFormat
}

export interface healthInformation {
  feelingWellandInGooHealth: boolean;
  eatenInLastFourHours: boolean;
  everBeenRefusedAsBloodDonor: boolean;
  involdedInLifeEndageringActivity: {
    drivingPublicTransport: boolean;
    pilotingAircraft: boolean;
  };
  duringLastSevenDays: {
    takenMedication: boolean;
    beenToTheDentist: boolean;
  };
  inPastSixMonths: {
    hadVaccination: boolean;
    exposedToInductrialChemicals: boolean;
    receivedTreatment: boolean;
    undergoneSurgery: boolean;
    exposedToBlood: boolean;
    hadPiercing: boolean;
  };
  operationInNextTwoMonths: boolean;
  participatedInDrugTrial: boolean;
  takenTigasonOrNeotigason: boolean;

  femaleDonors: {
    breastFeeding: boolean;
    pregnant: boolean;
  }
  hadHepatitisBefore: boolean;
  givenHepatitisBinlast6Months: boolean;
  hadMalariaInPast36Months: boolean;
  visitedMalariaAreainPast3Weeks: boolean;

  hadHeartDiseaseBefore: boolean;
  hadLungDiseaseBefore: boolean;
  hadBloodDiseaseBefore: boolean;
  hadThyroidDiseaseBefore: boolean;
  hadSkinDiseaseBefore: boolean;
  hadChagasDiseaseBefore: boolean;
  hadChronicMedicalConditionBefore: boolean;

  CJD:{
    hadTissueTransplantBefore: boolean;
    hadFertilityMedicineBefore: boolean;
    hadRelativeWithCJD: boolean;
  }


}
