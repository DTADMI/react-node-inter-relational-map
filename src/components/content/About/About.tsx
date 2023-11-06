import React from "react";
import {MapsActionMenu} from "../../nav/MapsActionMenu/MapsActionMenu";
import Flow from "../../flow/Flow";
import OverviewFlow from "../../flow/OverviewFlow";
import "./About.css"

export const About = () => {
    return (
        <>
            <div className="container-fluid overflow-hidden" style={{ position: "fixed", top: "3.9rem", bottom: "1.8rem" }}>
                <div className="row vh-100 overflow-auto" style={{ maxHeight: "90.3vh", backgroundColor: "lightblue" }}>
                    <MapsActionMenu />
                    <div className="scroll-wrapper col d-flex flex-column h-100" style={{ maxHeight: "90vh" }}>
                        <div className="column" style={{ position: "fixed", top: "3.9rem", bottom: "1.8rem", maxWidth: "90vh" }}>
                            <div className="col text-center map-title-wrapper">
                                <h3>Map name</h3>
                            </div>
                            <div style={{width: "200vh", height: "90vh"}}>
                                <OverviewFlow />
                            </div>
                        </div>
                    </div>
                    {/*<div className="col d-flex flex-column h-100">
                        <main className="row">
                            <div className="col pt-4">
                                <h3>Vertical Sidebar that switches to Horizontal Navbar</h3>
                                <p className="lead">An example multi-level sidebar with collasible menu items. The menu functions like an "accordion" where only a single menu is be open at a time.</p>
                                <hr />
                                <h3>More content...</h3>
                                <p>Sriracha biodiesel taxidermy organic post-ironic, Intelligentsia salvia mustache 90's code editing brunch. Butcher polaroid VHS art party, hashtag Brooklyn deep v PBR narwhal sustainable mixtape swag wolf squid tote bag. Tote bag cronut semiotics, raw denim deep v taxidermy messenger bag. Tofu YOLO Etsy, direct trade ethical Odd Future jean shorts paleo. Forage Shoreditch tousled aesthetic irony, street art organic Bushwick artisan cliche semiotics ugh synth chillwave meditation. Shabby chic lomo plaid vinyl chambray Vice. Vice sustainable cardigan, Williamsburg master cleanse hella DIY 90's blog.</p>
                                <p>Ethical Kickstarter PBR asymmetrical lo-fi. Dreamcatcher street art Carles, stumptown gluten-free Kickstarter artisan Wes Anderson wolf pug. Godard sustainable you probably haven't heard of them, vegan farm-to-table Williamsburg slow-carb readymade disrupt deep v. Meggings seitan Wes Anderson semiotics, cliche American Apparel whatever. Helvetica cray plaid, vegan brunch Banksy leggings +1 direct trade. Wayfarers codeply PBR selfies. Banh mi McSweeney's Shoreditch selfies, forage fingerstache food truck occupy YOLO Pitchfork fixie iPhone fanny pack art party Portland.</p>
                            </div>
                        </main>
                        <footer className="row bg-light py-4 mt-auto">
                            <div className="col"> Bottom footer content here... </div>
                        </footer>
                    </div>*/}
                </div>
            </div>
            {/*<div className="display-container">
                <div className="scroll-wrapper">
                    <div className="container">
                        <h3>About this application</h3>
                        <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu risus quis varius quam quisque. Aliquet bibendum enim facilisis gravida neque convallis a cras semper. Nisl suscipit adipiscing bibendum est. Ultricies mi eget mauris pharetra et ultrices neque ornare. Lorem sed risus ultricies tristique nulla. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate sapien. Orci nulla pellentesque dignissim enim. Nisl nisi scelerisque eu ultrices vitae auctor. Enim nec dui nunc mattis enim ut. Faucibus interdum posuere lorem ipsum dolor sit amet consectetur. Ut enim blandit volutpat maecenas volutpat blandit aliquam etiam erat.

Ipsum consequat nisl vel pretium lectus. Id velit ut tortor pretium viverra suspendisse potenti nullam. Amet mattis vulputate enim nulla aliquet porttitor lacus. Diam donec adipiscing tristique risus nec feugiat. Id ornare arcu odio ut sem nulla pharetra diam sit. Diam quam nulla porttitor massa id. Ut sem nulla pharetra diam. Aliquet bibendum enim facilisis gravida. Consequat ac felis donec et odio pellentesque diam volutpat commodo. Quis auctor elit sed vulputate mi sit amet mauris. Viverra adipiscing at in tellus integer feugiat scelerisque varius morbi. Id aliquet risus feugiat in ante metus. Nec ullamcorper sit amet risus nullam eget felis. Tortor at risus viverra adipiscing at. Nunc id cursus metus aliquam eleifend mi in nulla posuere. Enim sit amet venenatis urna. Tristique et egestas quis ipsum. Nunc vel risus commodo viverra maecenas. Venenatis urna cursus eget nunc scelerisque. Dignissim diam quis enim lobortis scelerisque fermentum.

Sollicitudin aliquam ultrices sagittis orci a scelerisque purus. Id venenatis a condimentum vitae sapien pellentesque. Gravida cum sociis natoque penatibus et magnis dis parturient montes. Gravida quis blandit turpis cursus. Enim ut sem viverra aliquet eget sit amet tellus. Nisl nisi scelerisque eu ultrices vitae auctor eu augue. Lorem ipsum dolor sit amet consectetur. Elementum nisi quis eleifend quam. Nec dui nunc mattis enim ut tellus elementum sagittis vitae. Convallis convallis tellus id interdum velit. Lectus proin nibh nisl condimentum id venenatis a. Ut lectus arcu bibendum at varius vel. Vitae turpis massa sed elementum tempus egestas. Id aliquet lectus proin nibh nisl condimentum.

Cras pulvinar mattis nunc sed blandit libero volutpat. At lectus urna duis convallis convallis tellus id interdum. Ullamcorper morbi tincidunt ornare massa eget egestas purus viverra. Lorem ipsum dolor sit amet consectetur. Sem et tortor consequat id porta nibh venenatis cras sed. Luctus accumsan tortor posuere ac ut. Velit aliquet sagittis id consectetur purus ut faucibus pulvinar elementum. Nec nam aliquam sem et tortor consequat. Quis viverra nibh cras pulvinar. Porttitor lacus luctus accumsan tortor. Fermentum iaculis eu non diam phasellus vestibulum lorem. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Risus feugiat in ante metus dictum at.

Et ultrices neque ornare aenean euismod elementum nisi. Malesuada fames ac turpis egestas integer eget aliquet nibh praesent. Sed pulvinar proin gravida hendrerit lectus a. In est ante in nibh mauris cursus. Nibh tortor id aliquet lectus proin. Elit duis tristique sollicitudin nibh sit amet commodo. Molestie at elementum eu facilisis sed odio morbi quis commodo. Egestas integer eget aliquet nibh praesent tristique magna. At in tellus integer feugiat scelerisque varius. Ut eu sem integer vitae justo eget magna fermentum iaculis. At risus viverra adipiscing at in tellus. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu.

At in tellus integer feugiat scelerisque varius morbi. Sit amet risus nullam eget. Eu non diam phasellus vestibulum. Vitae tortor condimentum lacinia quis vel eros donec ac. Nunc consequat interdum varius sit amet mattis vulputate enim. Tincidunt tortor aliquam nulla facilisi cras. Viverra tellus in hac habitasse platea. Sit amet dictum sit amet. Iaculis nunc sed augue lacus viverra vitae congue eu consequat. Quis lectus nulla at volutpat diam ut venenatis tellus in.

Et malesuada fames ac turpis. Sit amet volutpat consequat mauris. Consectetur adipiscing elit ut aliquam purus sit. Egestas dui id ornare arcu. Feugiat nibh sed pulvinar proin gravida hendrerit lectus. Urna neque viverra justo nec ultrices dui sapien eget. Tincidunt lobortis feugiat vivamus at augue eget. Aliquet porttitor lacus luctus accumsan tortor posuere. Lacinia at quis risus sed vulputate odio ut enim. Vitae purus faucibus ornare suspendisse sed nisi lacus. Tempor orci dapibus ultrices in iaculis nunc. Lectus sit amet est placerat. Dolor morbi non arcu risus.

Malesuada proin libero nunc consequat. Morbi non arcu risus quis. Gravida cum sociis natoque penatibus. Cras tincidunt lobortis feugiat vivamus at augue eget arcu. Amet massa vitae tortor condimentum lacinia quis vel eros donec. Porttitor leo a diam sollicitudin tempor id. Nibh sit amet commodo nulla. Faucibus ornare suspendisse sed nisi lacus sed viverra. Lobortis elementum nibh tellus molestie nunc non blandit massa. Fames ac turpis egestas integer. Risus pretium quam vulputate dignissim suspendisse in est ante in. Lacinia at quis risus sed vulputate odio ut. Massa vitae tortor condimentum lacinia quis vel eros donec ac. Nec nam aliquam sem et tortor consequat id porta. Nisl purus in mollis nunc sed id semper. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Nisl vel pretium lectus quam id leo in vitae. Dui nunc mattis enim ut tellus elementum sagittis. Rhoncus urna neque viverra justo nec ultrices dui sapien.

Mi proin sed libero enim sed faucibus turpis. Sit amet justo donec enim diam vulputate ut. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Felis donec et odio pellentesque diam volutpat commodo sed. Dui ut ornare lectus sit amet. Elementum pulvinar etiam non quam lacus suspendisse faucibus. Est sit amet facilisis magna etiam tempor. Elit ut aliquam purus sit amet. Placerat orci nulla pellentesque dignissim enim sit amet venenatis. Ut tortor pretium viverra suspendisse. Elementum pulvinar etiam non quam lacus suspendisse faucibus interdum. Vel orci porta non pulvinar neque laoreet suspendisse. Quam viverra orci sagittis eu volutpat odio. Urna porttitor rhoncus dolor purus non enim praesent elementum. Odio facilisis mauris sit amet massa vitae. Ullamcorper eget nulla facilisi etiam dignissim. Turpis egestas sed tempus urna et.

At lectus urna duis convallis. At urna condimentum mattis pellentesque id nibh tortor. Sed viverra ipsum nunc aliquet bibendum enim facilisis gravida neque. Lacus sed viverra tellus in. Aliquam purus sit amet luctus venenatis lectus. Amet consectetur adipiscing elit duis. Porttitor eget dolor morbi non arcu risus quis. In hendrerit gravida rutrum quisque non tellus orci ac. In fermentum et sollicitudin ac orci phasellus egestas. Sit amet venenatis urna cursus eget nunc scelerisque viverra.</span>
                    </div>
                </div>
            </div>*/}
        </>
    );
};
