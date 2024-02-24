import { React } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";

const Navbar = (props) => {
    const username = sessionStorage.getItem("username");

    // TODO : control activeClassName="is-active" in NavLink with props
    return (
        <header>
            <nav class="bg-cultured/50 shadow shadow-independence/15 w-100 px-8 md:px-auto">
                <div class="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
                    {/* Logo */}
                    <div class="text-tufts-blue md:order-1">
                        <ul class="flex font-semibold justify-between">
                            <li>
                                <NavLink to="/">
                                    <img class="h-11 w-11" src={Logo} />
                                </NavLink>
                            </li>
                            <li class="md:px-4 md:py-2 text-queen-blue font-bold">
                                <NavLink to="/">داشبورد</NavLink>
                            </li>
                            <li class="md:px-4 md:py-2 hover:text-blue-yonder">
                                <NavLink href="/">ارتباط با ما</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div class="text-queen-blue order-3 w-full md:w-auto md:order-2">
                        {username ? (
                            <NavLink to="/">
                                <div className="fa-layers fa-fw fa-2xl hover:text-blue-yonder">
                                    <i className="fa fa-user-circle" title="صفحه شخصی"></i>
                                </div>
                            </NavLink>
                        ) : (
                            <NavLink to="/login">
                                <div class="px-3 py-1 bg-queen-blue hover:bg-blue-yonder text-cultured rounded-lg flex items-center gap-2">
                                    <span>ورود</span>
                                    <i class="fa-solid fa-arrow-right-to-bracket"></i>
                                </div>
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
