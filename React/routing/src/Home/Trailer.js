import React from 'react';
import ReactPlayer from 'react-player';

const styles = {
    trailer: {
        width: '640px',
        height: '360px',
    },
    innerTrailer: {
        width: '100%',
        height: '100%',        
    }
}

function Trailer(props) {    
    let containsEmbed = props.movie.trailerUrl.indexOf('/embed') > 0;

    return (
        <span>
            <h2>Trailer of {props.movie.title}</h2>            
            <div className="trailer" style={styles.trailer}>
                <div style={styles.innerTrailer}>
                    {
                        containsEmbed ?
                        <iframe                            
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            title="YouTube video player" 
                            width="100%" 
                            height="100%" 
                            src={props.movie.trailerUrl}
                            id={props.movie._id}>
                        </iframe>
                        :
                        <ReactPlayer url={props.movie.trailerUrl} playing/>
                    }
                </div>
            </div>
        </span>
    );    
}

export default Trailer;