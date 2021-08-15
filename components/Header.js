import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@material-tailwind/react/Navbar";
import NavbarContainer from "@material-tailwind/react/NavbarContainer";
import NavbarWrapper from "@material-tailwind/react/NavbarWrapper";
import NavbarBrand from "@material-tailwind/react/NavbarBrand";
import NavbarToggler from "@material-tailwind/react/NavbarToggler";
import NavbarCollapse from "@material-tailwind/react/NavbarCollapse";
import Nav from "@material-tailwind/react/Nav";
import NavLink from "@material-tailwind/react/NavLink";
import Icon from "@material-tailwind/react/Icon";

const MyNavLink = React.forwardRef(
    function MyNavLink(props, forwardedRef) {
        const {
            href,
            ...other
        } = props
        return (
            <Link href={href}>
                <NavLink ripple="light" ref={forwardedRef} {...other}/>
            </Link>
        )
    });

export default function MyNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
    const router = useRouter();

    router.events?.on("routeChangeComplete", () => {setOpenNavbar(false)});

    return (
        <Navbar color="blue" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <NavbarBrand>
                        <Link href="/"><a className="text-lg">mizuaoi.net</a></Link>
                    </NavbarBrand>
                    <NavbarToggler
                        color="white"
                        onClick={() => setOpenNavbar(!openNavbar)}
                        ripple="light"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <NavLink
                            ripple="light"
                            href="/about/"
                        >
                            <Icon name="account_circle" size="xl" />
                            About
                        </NavLink>
                        <NavLink
                            ripple="light"
                            href="/tags/"
                        >
                            <Icon name="local_offer" size="xl" />
                            Tags
                        </NavLink>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}