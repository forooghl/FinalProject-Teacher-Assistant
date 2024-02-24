import { React } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/img/Logo.png";

const Navbar = (props) => {
    const username = sessionStorage.getItem("username");

    // TODO : control activeClassName="is-active" in NavLink with props
    return (
        <header>
            <nav class="bg-cultured/50 shadow shadow-independence/15 w-100 px-8 md:px-auto">
                <div class="h-16 mx-auto md:px-4 container flex items-center justify-between flex-nowrap">
                    {/* Logo */}
                    <div>
                        <NavLink to="/">
                            <img class="h-11 w-11" src={Logo} />
                        </NavLink>
                    </div>
                    <div class="text-tufts-blue basis-11/12 max-md:w-auto max-md:basis-1/3">
                        <ul class="flex font-semibold justify-start max-md:justify-between">
                            <li class="md:px-4 md:py-2 text-queen-blue font-bold">
                                <NavLink to="/">داشبورد</NavLink>
                            </li>
                            <li class="md:px-4 md:py-2 hover:text-blue-yonder">
                                <NavLink href="/">ارتباط با ما</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div class="text-queen-blue max-md:w-fit">
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
