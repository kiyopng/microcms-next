import Link from "next/link";
import React, { useState } from "react";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import Icon from "@material-tailwind/react/Icon";

export default function MyNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);

    return (
        <Navbar color="blue" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <NavbarBrand>
                        <Link href="/"><a className="no-underline hover:underline text-lg">mizuaoi.net</a></Link>
                    </NavbarBrand>
                    <NavbarToggler
                        color="white"
                        onClick={() => setOpenNavbar(!openNavbar)}
                        ripple="light"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <NavLink href="../about/" ripple="light">
                            <Icon name="account_circle" size="xl" />
                            About
                        </NavLink>
                        <NavLink href="./tags/" ripple="light">
                            <Icon name="local_offer" size="xl" />
                            Tags
                        </NavLink>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}