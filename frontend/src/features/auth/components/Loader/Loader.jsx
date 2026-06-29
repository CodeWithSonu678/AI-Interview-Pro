import React from 'react'
import '../Loader/Loader.scss'
import {useInterview} from '../../../interview/Hooks/useInterview'

const Loader = () => {
    const {loading,loadingMessage} = useInterview()
    return (
        <>
            {loading && (
                <div className="loading-overlay">
                    <div className="loader"></div>
                    <p>{loadingMessage}</p>
                </div>
            )}
        </>

    )
}

export default Loader
