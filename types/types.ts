export type Constructor = {
  Constructor: {
    name: string;
  };
  position: string;
  points: string;
};

export type Driver = {
  position: string;
  points: string;
  Driver: {
    givenName: string;
    familyName: string;
  };
};

export type Race = {
  round: string;
  raceName: string;
  date: string;
  Circuit: {
    Location: {
      country: string;
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
