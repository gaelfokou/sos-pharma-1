'use client';

import 'bootstrap/dist/css/bootstrap.min.css';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import 'intl-tel-input/build/css/intlTelInput.css';
import '../assets/css/style.css';

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function LayoutDashboard({ children }) {
  return (
    <div className="d-flex flex-column justify-content-between vh-100">
      <div className="d-flex flex-column">
        <Header />
        <div className="container">
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
