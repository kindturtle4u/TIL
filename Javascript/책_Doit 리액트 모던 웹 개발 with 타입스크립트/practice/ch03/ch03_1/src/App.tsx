import React from 'react';
import logo from './logo.svg';
import './App.css';
import UsingIconWithCSSClass from "./pages/UsingIconWithCSSClass";
import UsingIcon from "./pages/UsingIcon";
import Style from "./pages/Style";
import Icon from "./pages/Icon";
import Bootstrap from "./pages/Bootstrap";

export default function App() {
    return (
        <div>
            <UsingIconWithCSSClass/>
            <UsingIcon/>
            <Style/>
            <Icon/>
            <Bootstrap/>
        </div>
    )
}

