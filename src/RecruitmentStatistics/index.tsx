import React, {useCallback, useEffect, useState} from "react";
import SimpleCard from "../components/SimpleCard";
import {Container, Row, Col} from "react-bootstrap";

declare global {
    interface Window {
        gapi:any;
    }
}

const CLIENT_ID = "86269382105-gue1lqv44ke3jmhkb4fie21rvse4t7ff.apps.googleusercontent.com";
const API_KEY = 'AIzaSyDHsL9qG-N6Lxio-iqoUF0Eh7JKliWkqiE';
const DISCOVERY = "https://content.googleapis.com/discovery/v1/apis/calendar/v3/rest";

const RecruitmentStatistics = () => {

    const [gapiInitialized, setGapiInitialized] = useState(false);
    const [numberOfPairProgrammings, setNumberOfPairProgrammings] = useState(0);

    const loadGoogleAPI = useCallback(() => {
        const script = document.createElement("script");
        script.src = "https://apis.google.com/js/client.js";

        script.onload = () => {
            const gapi = window.gapi;

            gapi.load("client:auth2", function () {
                gapi.auth2.init({client_id: CLIENT_ID});

                function loadClient() {
                    gapi.client.setApiKey(API_KEY);
                    return gapi.client.load(DISCOVERY)
                        .then(function () {
                                console.log("GAPI client loaded for API");

                                gapi.client.calendar.events.list({
                                    "calendarId": "netguru.com_d4kaofi19a7ev3jhu18063oo4k@group.calendar.google.com",
                                    "timeMin": "2020-04-26T00:00:00-07:00",
                                    "timeZone": "2020-05-01T00:00:00-07:00"
                                })
                                    .then(async function (response) {
                                            // Handle the results here (response.result has the parsed body).


                                            setNumberOfPairProgrammings(response.result.items.length);
                                        },
                                        function () {
                                            console.error("Execute error");
                                        });

                            },
                            function (err) {
                                console.error("Error loading GAPI client for API", err);
                            });
                }

                gapi.auth2.getAuthInstance()
                    .signIn({scope: "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.readonly"})
                    .then(function () {
                            console.log("Sign-in successful");
                        },
                        function (err) {
                            console.error("Error signing in", err);
                        }).then(loadClient)
            });
        };
        document.body.appendChild(script);
    }, []);

    useEffect(() => {
        loadGoogleAPI();
        const gapi = window.gapi;

    }, [loadGoogleAPI]);

    const calendarId = 'netguru.com_d4kaofi19a7ev3jhu18063oo4k@group.calendar.google.com';
    const timeMin = "2020-04-26T00:00:00-07:00";
    const timeMax = "2020-05-01T00:00:00-07:00";

    return (
        <Container>
            <h1>This week</h1>
            <Row>
                <Col>
                    <SimpleCard title={numberOfPairProgrammings} text="Numbers of pair-programming" />
                </Col>
                {/*<Col>*/}
                {/*    <SimpleCard title="3" text="Numbers of pair-programming" />*/}
                {/*</Col>*/}
            </Row>
        </Container>
    );
};
export default RecruitmentStatistics;


