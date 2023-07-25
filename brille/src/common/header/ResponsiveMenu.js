import React from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';

const ResponsiveMenu = ( { show, onClose, showSearch, onSearch } ) => {
    var elements = document.querySelectorAll( '.popup-mobile-menu .has-droupdown > a' );
    var elementsTwo = document.querySelectorAll( '.popup-mobile-menu .with-megamenu > a' );
    for( var i in elements ) {
        if( elements.hasOwnProperty( i ) ) {
            elements[i].onclick = function() {
                this.parentElement.querySelector( '.submenu').classList.toggle( 'active' );
                this.classList.toggle( 'open' );
            }
        }
    }

    for( var j in elementsTwo ) {
        if(elementsTwo.hasOwnProperty(i)) {
            elementsTwo[j].onclick = function() {
                this.parentElement.querySelector( '.rn-megamenu' ).classList.toggle( 'active' );
                this.classList.toggle( 'open' );
            }
        }
    }

    return (
        <>
            <div className={ `popup-mobile-menu ${ show ? 'active': ''}` }>
                <div className="inner">
                    <div className="header-top">
                        <div className="logo">
                            <Link to={process.env.PUBLIC_URL + '/' }>
                                <h6>ET QUE ÇA BRILLE</h6>
                            </Link>
                        </div>
                        <div className="close-menu">
                            <button className="close-button" onClick={ onClose }>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>
                    </div>
                    <Nav />
                </div>
            </div>

            <div className={ `edu-search-popup ${ showSearch ? 'open': ''}` }>
                <div className="close-button">
                    <button className="close-trigger" onClick={ onSearch }><i className="ri-close-line"></i></button>
                </div>

            </div>
        </>
    )
}

export default ResponsiveMenu;