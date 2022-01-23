import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Banner from "./Banner";

function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container">
        <div className="row">
          <div className="col">
            <Banner />
            {children}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Layout;