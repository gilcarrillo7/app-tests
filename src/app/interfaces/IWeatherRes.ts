export interface IWeatherRes {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: Current;
  hourly: Current[];
  daily: Daily[];
}

export interface Current {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  wind_gust?: number;
  pop?: number;
  rain?: Rain;
}

export interface Rain {
  "1h": number;
}

export interface Weather {
  id: number;
  main: Main;
  description: Description;
  icon: string;
}

export enum Description {
  BrokenClouds = "broken clouds",
  ClearSky = "clear sky",
  FewClouds = "few clouds",
  LightRain = "light rain",
  ModerateRain = "moderate rain",
  OvercastClouds = "overcast clouds",
  ScatteredClouds = "scattered clouds",
}

export enum Main {
  Clear = "Clear",
  Clouds = "Clouds",
  Rain = "Rain",
}

export interface Daily {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust: number;
  weather: Weather[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

export interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

export interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
  public static toIWeatherRes(json: string): IWeatherRes {
    return cast(JSON.parse(json), r("IWeatherRes"));
  }

  public static iWeatherResToJson(value: IWeatherRes): string {
    return JSON.stringify(uncast(value, r("IWeatherRes")), null, 2);
  }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ""): never {
  const prettyTyp = prettyTypeName(typ);
  const parentText = parent ? ` on ${parent}` : "";
  const keyText = key ? ` for key "${key}"` : "";
  throw Error(
    `Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(
      val
    )}`
  );
}

function prettyTypeName(typ: any): string {
  if (Array.isArray(typ)) {
    if (typ.length === 2 && typ[0] === undefined) {
      return `an optional ${prettyTypeName(typ[1])}`;
    } else {
      return `one of [${typ
        .map((a) => {
          return prettyTypeName(a);
        })
        .join(", ")}]`;
    }
  } else if (typeof typ === "object" && typ.literal !== undefined) {
    return typ.literal;
  } else {
    return typeof typ;
  }
}

function jsonToJSProps(typ: any): any {
  if (typ.jsonToJS === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.json] = { key: p.js, typ: p.typ }));
    typ.jsonToJS = map;
  }
  return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
  if (typ.jsToJSON === undefined) {
    const map: any = {};
    typ.props.forEach((p: any) => (map[p.js] = { key: p.json, typ: p.typ }));
    typ.jsToJSON = map;
  }
  return typ.jsToJSON;
}

function transform(
  val: any,
  typ: any,
  getProps: any,
  key: any = "",
  parent: any = ""
): any {
  function transformPrimitive(typ: string, val: any): any {
    if (typeof typ === typeof val) return val;
    return invalidValue(typ, val, key, parent);
  }

  function transformUnion(typs: any[], val: any): any {
    // val must validate against one typ in typs
    const l = typs.length;
    for (let i = 0; i < l; i++) {
      const typ = typs[i];
      try {
        return transform(val, typ, getProps);
      } catch (_) {}
    }
    return invalidValue(typs, val, key, parent);
  }

  function transformEnum(cases: string[], val: any): any {
    if (cases.indexOf(val) !== -1) return val;
    return invalidValue(
      cases.map((a) => {
        return l(a);
      }),
      val,
      key,
      parent
    );
  }

  function transformArray(typ: any, val: any): any {
    // val must be an array with no invalid elements
    if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
    return val.map((el) => transform(el, typ, getProps));
  }

  function transformDate(val: any): any {
    if (val === null) {
      return null;
    }
    const d = new Date(val);
    if (isNaN(d.valueOf())) {
      return invalidValue(l("Date"), val, key, parent);
    }
    return d;
  }

  function transformObject(
    props: { [k: string]: any },
    additional: any,
    val: any
  ): any {
    if (val === null || typeof val !== "object" || Array.isArray(val)) {
      return invalidValue(l(ref || "object"), val, key, parent);
    }
    const result: any = {};
    Object.getOwnPropertyNames(props).forEach((key) => {
      const prop = props[key];
      const v = Object.prototype.hasOwnProperty.call(val, key)
        ? val[key]
        : undefined;
      result[prop.key] = transform(v, prop.typ, getProps, key, ref);
    });
    Object.getOwnPropertyNames(val).forEach((key) => {
      if (!Object.prototype.hasOwnProperty.call(props, key)) {
        result[key] = transform(val[key], additional, getProps, key, ref);
      }
    });
    return result;
  }

  if (typ === "any") return val;
  if (typ === null) {
    if (val === null) return val;
    return invalidValue(typ, val, key, parent);
  }
  if (typ === false) return invalidValue(typ, val, key, parent);
  let ref: any = undefined;
  while (typeof typ === "object" && typ.ref !== undefined) {
    ref = typ.ref;
    typ = typeMap[typ.ref];
  }
  if (Array.isArray(typ)) return transformEnum(typ, val);
  if (typeof typ === "object") {
    return typ.hasOwnProperty("unionMembers")
      ? transformUnion(typ.unionMembers, val)
      : typ.hasOwnProperty("arrayItems")
      ? transformArray(typ.arrayItems, val)
      : typ.hasOwnProperty("props")
      ? transformObject(getProps(typ), typ.additional, val)
      : invalidValue(typ, val, key, parent);
  }
  // Numbers can be parsed by Date but shouldn't be.
  if (typ === Date && typeof val !== "number") return transformDate(val);
  return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
  return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
  return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
  return { literal: typ };
}

function a(typ: any) {
  return { arrayItems: typ };
}

function u(...typs: any[]) {
  return { unionMembers: typs };
}

function o(props: any[], additional: any) {
  return { props, additional };
}

function m(additional: any) {
  return { props: [], additional };
}

function r(name: string) {
  return { ref: name };
}

const typeMap: any = {
  IWeatherRes: o(
    [
      { json: "lat", js: "lat", typ: 3.14 },
      { json: "lon", js: "lon", typ: 3.14 },
      { json: "timezone", js: "timezone", typ: "" },
      { json: "timezone_offset", js: "timezone_offset", typ: 0 },
      { json: "current", js: "current", typ: r("Current") },
      { json: "hourly", js: "hourly", typ: a(r("Current")) },
      { json: "daily", js: "daily", typ: a(r("Daily")) },
    ],
    false
  ),
  Current: o(
    [
      { json: "dt", js: "dt", typ: 0 },
      { json: "sunrise", js: "sunrise", typ: u(undefined, 0) },
      { json: "sunset", js: "sunset", typ: u(undefined, 0) },
      { json: "temp", js: "temp", typ: 3.14 },
      { json: "feels_like", js: "feels_like", typ: 3.14 },
      { json: "pressure", js: "pressure", typ: 0 },
      { json: "humidity", js: "humidity", typ: 0 },
      { json: "dew_point", js: "dew_point", typ: 3.14 },
      { json: "uvi", js: "uvi", typ: 3.14 },
      { json: "clouds", js: "clouds", typ: 0 },
      { json: "visibility", js: "visibility", typ: 0 },
      { json: "wind_speed", js: "wind_speed", typ: 3.14 },
      { json: "wind_deg", js: "wind_deg", typ: 0 },
      { json: "weather", js: "weather", typ: a(r("Weather")) },
      { json: "wind_gust", js: "wind_gust", typ: u(undefined, 3.14) },
      { json: "pop", js: "pop", typ: u(undefined, 3.14) },
      { json: "rain", js: "rain", typ: u(undefined, r("Rain")) },
    ],
    false
  ),
  Rain: o([{ json: "1h", js: "1h", typ: 3.14 }], false),
  Weather: o(
    [
      { json: "id", js: "id", typ: 0 },
      { json: "main", js: "main", typ: r("Main") },
      { json: "description", js: "description", typ: r("Description") },
      { json: "icon", js: "icon", typ: "" },
    ],
    false
  ),
  Daily: o(
    [
      { json: "dt", js: "dt", typ: 0 },
      { json: "sunrise", js: "sunrise", typ: 0 },
      { json: "sunset", js: "sunset", typ: 0 },
      { json: "moonrise", js: "moonrise", typ: 0 },
      { json: "moonset", js: "moonset", typ: 0 },
      { json: "moon_phase", js: "moon_phase", typ: 3.14 },
      { json: "temp", js: "temp", typ: r("Temp") },
      { json: "feels_like", js: "feels_like", typ: r("FeelsLike") },
      { json: "pressure", js: "pressure", typ: 0 },
      { json: "humidity", js: "humidity", typ: 0 },
      { json: "dew_point", js: "dew_point", typ: 3.14 },
      { json: "wind_speed", js: "wind_speed", typ: 3.14 },
      { json: "wind_deg", js: "wind_deg", typ: 0 },
      { json: "wind_gust", js: "wind_gust", typ: 3.14 },
      { json: "weather", js: "weather", typ: a(r("Weather")) },
      { json: "clouds", js: "clouds", typ: 0 },
      { json: "pop", js: "pop", typ: 3.14 },
      { json: "rain", js: "rain", typ: 3.14 },
      { json: "uvi", js: "uvi", typ: 3.14 },
    ],
    false
  ),
  FeelsLike: o(
    [
      { json: "day", js: "day", typ: 3.14 },
      { json: "night", js: "night", typ: 3.14 },
      { json: "eve", js: "eve", typ: 3.14 },
      { json: "morn", js: "morn", typ: 3.14 },
    ],
    false
  ),
  Temp: o(
    [
      { json: "day", js: "day", typ: 3.14 },
      { json: "min", js: "min", typ: 3.14 },
      { json: "max", js: "max", typ: 3.14 },
      { json: "night", js: "night", typ: 3.14 },
      { json: "eve", js: "eve", typ: 3.14 },
      { json: "morn", js: "morn", typ: 3.14 },
    ],
    false
  ),
  Description: [
    "broken clouds",
    "clear sky",
    "few clouds",
    "light rain",
    "moderate rain",
    "overcast clouds",
    "scattered clouds",
  ],
  Main: ["Clear", "Clouds", "Rain"],
};
