function Title( {pageTitle} ) {
    return(
        <div className="title-conatiner">
            <div className="shop-name">{pageTitle()}</div>
            <div className="date-container">Fresh -- Aguest 23, 2024</div>
            <div className="button-list">
                <button className="delfault-button">Default</button>
                <button className="a-z-button">A-Z</button>
                <button className="list-button">List view</button>
            </div>
        </div>
    );
}
export default Title;