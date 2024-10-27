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

export type SprintResult = {
  number: string;
  position: string;
  positionText: string;
  points: string;
  Driver: {
    driverId: string;
    permanentNumber?: string;
    code?: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructor: {
    constructorId: string;
    url: string;
    name: string;
    nationality: string;
  };
  grid: string;
  laps: string;
  status: string;
  Time?: {
    time: string;
  };
  FastestLap?: {
    rank: string;
    lap: string;
    Time: {
      time: string;
    };
    AverageSpeed: {
      units: string;
      speed: string;
    };
  };
};

export type SprintRace = {
  season: string;
  round: string;
  raceName: string;
  Circuit: {
    circuitId: string;
    circuitName: string;
    Location: {
      lat: string;
      long: string;
      locality: string;
      country: string;
    };
  };
  date: string;
  time: string;
  SprintResults: SprintResult[];
};

export type SprintRaceData = {
  MRData: {
    RaceTable: {
      season: string;
      round: string;
      Races: SprintRace[];
    };
  };
};
