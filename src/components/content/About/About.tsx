import React from "react";
import "./About.css"

export const About = () => {
    return (
        <div className="display-container">
            <div className="scroll-wrapper">
                <div className="container">
                    <h3>About this application</h3>
                    <p>This is a personal project page.</p>
                    <p>This application is still a work in progress. 😏😉 Thank you for your understanding. 👌🏿✨ 🫱🏿‍🫲🏽</p>

                    <h4>What's the point? How to use it?</h4>

                    <p>The ultimate point is to be able to create a visual map of one's relationships tree.</p>
                    <p>Each map represents a sort of genealogy tree, but with all type of relationships.</p>
                    <p>To start, you create a map, then add people in it by giving them names, family names, and titles if applicable.</p>
                    <p>Then you connect them by dragging vertexes from the little dots in their box.</p>
                    <br/>
                    <p>The connections between boxes will represent the types of relationship between the different people.</p>
                    <p>You can also add stories about them (not yet implemented).</p>
                    <br/>
                    <p>Ultimately, you'll be able to create many maps with many people, their relationships and the stories that connect them, and then visualize all of that in a giant map of nodes and edges. 😁💐🎊🎉🌈</p>
                </div>
            </div>
        </div>
    );
};
