// light icons
import car_park from "../images/icons/light_amenities/amenities_car_park_icon.svg";
import gym from "../images/icons/light_amenities/amenities_gym_icon.svg";
import swimming_pool from "../images/icons/light_amenities/amenities_swimming_pool_icon.svg";
import football_pitch from "../images/icons/light_amenities/amenities_football_pitch_icon.svg";
import recreational_area from "../images/icons/light_amenities/amenities_recreational_area_icon.svg";
import basketball_court from "../images/icons/light_amenities/amenities_basketball_court_icon.svg";
import worship_center from "../images/icons/light_amenities/amenities_worship_center_icon.svg";
import shopping_complex from "../images/icons/light_amenities/amenities_shopping_complex_icon.svg";
import street_lights from "../images/icons/light_amenities/amenities_street_lights_icon.svg";
import garden from "../images/icons/light_amenities/amenities_garden_icon.svg";
import internet_wifi from "../images/icons/light_amenities/amenities_internet_wifi_icon.svg";
import cctv from "../images/icons/light_amenities/amenities_cctv_icon.svg";
import alternative_power_supply from "../images/icons/light_amenities/amenities_alternative_power_supply_icon.svg";
import school from "../images/icons/light_amenities/amenities_school_icon.svg";
import health_facility from "../images/icons/light_amenities/amenities_health_facilities_icon.svg";
import helipad from "../images/icons/light_amenities/amenities_helipad_icon.svg";
import tennis_court from "../images/icons/light_amenities/amenities_tennis_court_icon.svg";
import elevator from "../images/icons/light_amenities/amenities_elevator_icon.svg";
import bar from "../images/icons/light_amenities/amenities_bar_icon.svg";
import lounge from "../images/icons/light_amenities/amenities_lounge_icon.svg";
import beach_front from "../images/icons/light_amenities/amenities_beach_front_icon.svg";
import security from "../images/icons/light_amenities/amenities_security_icon.svg";
import hours_light from "../images/icons/light_amenities/amenities_hours_light_icon.svg";
import golf_course from "../images/icons/light_amenities/amenities_golf_course_icon.svg";
import playground from "../images/icons/light_amenities/amenities_playground_icon.svg";
import spa from "../images/icons/light_amenities/amenities_spa_icon.svg";


// dark icons
import car_park_dark from "../images/icons/dark_amenities/amenities_car_park_icon.svg";
import gym_dark from "../images/icons/dark_amenities/amenities_gym_icon.svg";
import swimming_pool_dark from "../images/icons/dark_amenities/amenities_swimming_pool_icon.svg";
import football_pitch_dark from "../images/icons/dark_amenities/amenities_football_pitch_icon.svg";
import recreational_area_dark from "../images/icons/dark_amenities/amenities_recreational_area_icon.svg";
import basketball_court_dark from "../images/icons/dark_amenities/amenities_basketball_court_icon.svg";
import worship_center_dark from "../images/icons/dark_amenities/amenities_worship_center_icon.svg";
import shopping_complex_dark from "../images/icons/dark_amenities/amenities_shopping_complex_icon.svg";
import street_lights_dark from "../images/icons/dark_amenities/amenities_street_lights_icon.svg";
import garden_dark from "../images/icons/dark_amenities/amenities_garden_icon.svg";
import internet_wifi_dark from "../images/icons/dark_amenities/amenities_internet_wifi_icon.svg";
import cctv_dark from "../images/icons/dark_amenities/amenities_cctv_icon.svg";
import alternative_power_supply_dark from "../images/icons/dark_amenities/amenities_alternative_power_supply_icon.svg";
import school_dark from "../images/icons/dark_amenities/amenities_school_icon.svg";
import health_facility_dark from "../images/icons/dark_amenities/amenities_health_facilities_icon.svg";
import helipad_dark from "../images/icons/dark_amenities/amenities_helipad_icon.svg";
import tennis_court_dark from "../images/icons/dark_amenities/amenities_tennis_court_icon.svg";
import elevator_dark from "../images/icons/dark_amenities/amenities_elevator_icon.svg";
import bar_dark from "../images/icons/dark_amenities/amenities_bar_icon.svg";
import lounge_dark from "../images/icons/dark_amenities/amenities_lounge_icon.svg";
import beach_front_dark from "../images/icons/dark_amenities/amenities_beach_front_icon.svg";
import security_dark from "../images/icons/dark_amenities/amenities_security_icon.svg";
import hours_light_dark from "../images/icons/dark_amenities/amenities_hours_light_icon.svg";
import golf_course_dark from "../images/icons/dark_amenities/amenities_golf_course_icon.svg";
import playground_dark from "../images/icons/dark_amenities/amenities_playground_icon.svg";
import spa_dark from "../images/icons/dark_amenities/amenities_spa_icon.svg";




import { appCurrentTheme } from "../utils/localStorage";
import { LIGHT } from "./names";
import { CoOwnerIconSVG, FractionalIconSVG, OfferIconSVG, PurchaseIconSVG, StoryIconSVG, TourIconSVG, WalletIconSVG } from "assets/notifications";

// appCurrentTheme === DARK_BLUE 
export const AMENITIES = {
    car_park: appCurrentTheme === LIGHT ? car_park_dark : car_park,
    gym: appCurrentTheme === LIGHT ? gym_dark : gym,
    swimming_pool: appCurrentTheme === LIGHT ? swimming_pool_dark : swimming_pool,
    football_pitch: appCurrentTheme === LIGHT ? football_pitch_dark : football_pitch,
    recreational_area: appCurrentTheme === LIGHT ? recreational_area_dark : recreational_area,
    reacreational_area: appCurrentTheme === LIGHT ? recreational_area_dark : recreational_area,
    basketball_court: appCurrentTheme === LIGHT ? basketball_court_dark : basketball_court,
    worship_center: appCurrentTheme === LIGHT ? worship_center_dark : worship_center,
    shopping_complex: appCurrentTheme === LIGHT ? shopping_complex_dark : shopping_complex,
    street_lights: appCurrentTheme === LIGHT ? street_lights_dark : street_lights,
    garden: appCurrentTheme === LIGHT ? garden_dark : garden,
    internet_wifi: appCurrentTheme === LIGHT ? internet_wifi_dark : internet_wifi,
    cctv: appCurrentTheme === LIGHT ? cctv_dark : cctv,
    alternative_power_supply: appCurrentTheme === LIGHT ? alternative_power_supply_dark : alternative_power_supply,
    school: appCurrentTheme === LIGHT ? school_dark : school,
    health_facility: appCurrentTheme === LIGHT ? health_facility_dark : health_facility,
    helipad: appCurrentTheme === LIGHT ? helipad_dark : helipad,
    tennis_court: appCurrentTheme === LIGHT ? tennis_court_dark : tennis_court,
    elevator: appCurrentTheme === LIGHT ? elevator_dark : elevator,
    bar: appCurrentTheme === LIGHT ? bar_dark : bar,
    lounge: appCurrentTheme === LIGHT ? lounge_dark : lounge,
    beach_front: appCurrentTheme === LIGHT ? beach_front_dark : beach_front,
    security: appCurrentTheme === LIGHT ? security_dark : security,
    "24_hours_light": appCurrentTheme === LIGHT ? hours_light_dark : hours_light,
    golf_course: appCurrentTheme === LIGHT ? golf_course_dark : golf_course,
    spa: appCurrentTheme === LIGHT ? spa_dark : spa,
    playground: appCurrentTheme === LIGHT ? playground_dark : playground,
};

export const NOTIFICATION = {
    'wallet_transaction': <WalletIconSVG/>,
    'fractional_ownership': <FractionalIconSVG/>,
    'successful': <PurchaseIconSVG/>,
    'successful_purchase': <PurchaseIconSVG/>,
    'requested_tour': <TourIconSVG/>,
    'inspection_request': <TourIconSVG/>,
    'equity': <FractionalIconSVG/>,
    'requested_tour': <TourIconSVG/>,
    'scheduled_inspection': <OfferIconSVG/>,
    'co-ownership_invitation': <CoOwnerIconSVG/>,
    "what's_next": <StoryIconSVG/>,
};
