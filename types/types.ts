export type Constructor = {
  Constructor: {
    name: string;
    constructorId: string;
  };
  position: string;
  points: string;
  wins: string;
};

export type Driver = {
  position: string;
  points: string;
  wins: string;
  Driver: {
    givenName: string;
    familyName: string;
    driverId: string;
  };
};

export type Race = {
  round: string;
  raceName: string;
  date: string;
  Circuit: {
    Location: {
      country: string;
      long: string;
      lat: string;
    };
  };
};

export type RaceResults = {
  position: string;
  status: string;
  Driver: {
    familyName: string;
    givenName: string;
  };
  Constructor: {
    name: string;
  };
  Time: {
    time: string;
  };
};

export type QualifyingResults = {
  position: string;
  Driver: {
    driverId: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructor: {
    constructorId: string;
    name: string;
    nationality: string;
  };
  Q1: string;
  Q2?: string;
  Q3?: string;
};

export type News = {
  id: string;
  dataSourceIdentifier: string;
  description: string;
  headline: string;
  images: {
    url: string;
    caption?: string;
  }[];
  link: string;
};
