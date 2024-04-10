import "./Tunnel.scss"
import Footer from "../../molecules/global/Footer/Footer.tsx";
import HeaderMenu from "../../molecules/menu/HeaderMenu/HeaderMenu.tsx";
import InformationForm from "../../molecules/form/Information/InformationForm.tsx";
import {useEffect, useState} from "react";
import SwitchButton from "../../atomes/buttons/SwitchButton/SwitchButton.tsx";
import Input from "../../atomes/inputs/Input/Input.tsx";
import Button from "../../atomes/buttons/Button/Button.tsx";
import useUpdateUserById from "../../../services/hooks/useUpdateUserById.tsx";
import {useUser} from "../../../context/UserContext.tsx";
import Notification from "../../atomes/Notification/Notification.tsx";
import { useNavigate, useLocation } from 'react-router-dom';
import useGetUserById from "../../../services/hooks/useGetUserById.tsx";

export default function Information() {

    const UserContext = useUser();
    const UpdateUser = useUpdateUserById();
    const GetUsers = useGetUserById();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [entreprise, setEntreprise] = useState("");
    const [country, setCountry] = useState("");
    const [street, setStreet] = useState("");
    const [streetComplement, setStreetComplement] = useState("");
    const [postalCode, setPostalCode] = useState("");
    const [city, setCity] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    const [anotherAddress, setAnotherAddress] = useState(false);

    const [livraisonFirstname, setLivraisonFirstname] = useState("");
    const [livraisonLastname, setLivraisonLastname] = useState("");
    const [livraisonEntreprise, setLivraisonEntreprise] = useState("");
    const [livraisonCountry, setLivraisonCountry] = useState("");
    const [livraisonStreet, setLivraisonStreet] = useState("");
    const [livraisonStreetComplement, setLivraisonStreetComplement] = useState("");
    const [livraisonPostalCode, setLivraisonPostalCode] = useState("");
    const [livraisonCity, setLivraisonCity] = useState("");
    const [livraisonPhone, setLivraisonPhone] = useState("");
    const [livraisonEmail, setLivraisonEmail] = useState("");

    const [comment, setComment] = useState("");

    const [error, setError] = useState<string[]>([]);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const fromPath = location.state?.from
        if (fromPath !== "/menu" && fromPath !== "/information") {
            navigate("/menu");
        }
    }, []);

    useEffect(() => {
            (async () => {
                if (UserContext && UserContext.user?.userId) {
                    const user = await GetUsers(UserContext.user.userId);
                    setFirstname(user.billingInfo.firstname || "");
                    setLastname(user.billingInfo.lastname || "");
                    setEntreprise(user.billingInfo.company || "");
                    setCountry(user.billingInfo.country || "");
                    setStreet(user.billingInfo.address || "");
                    setStreetComplement(user.billingInfo.address2 || "");
                    setPostalCode(user.billingInfo.postalCode || "");
                    setCity(user.billingInfo.city || "");
                    setPhone(user.billingInfo.phone || "");
                    setEmail(user.billingInfo.email || "");
                    setLivraisonFirstname(user.deliveryInfo.firstname || "");
                    setLivraisonLastname(user.deliveryInfo.lastname || "");
                    setLivraisonEntreprise(user.deliveryInfo.company || "");
                    setLivraisonCountry(user.deliveryInfo.country || "");
                    setLivraisonStreet(user.deliveryInfo.address || "");
                    setLivraisonStreetComplement(user.deliveryInfo.address2 || "");
                    setLivraisonPostalCode(user.deliveryInfo.postalCode || "");
                    setLivraisonCity(user.deliveryInfo.city || "");
                    setLivraisonPhone(user.deliveryInfo.phone || "");
                    setLivraisonEmail(user.deliveryInfo.email || "");
                }
            })();
    }, [UserContext])
    const handleSubmit = async () => {
        if (anotherAddress) {
            if (!livraisonFirstname || !livraisonLastname || !livraisonEmail || !livraisonPhone || !livraisonCountry || !livraisonStreet || !livraisonPostalCode || !livraisonCity) {
                setError(["Veuillez remplir tous les champs obligatoires"]);
                return;
            }
        }
        if (!firstname || !lastname || !email || !phone || !country || !street || !postalCode || !city) {
            setError(["Veuillez remplir tous les champs obligatoires"]);
            return;
        }
        if (UserContext) {
            if (!UserContext.user?.userId) {
                setError(["Vous devez être connecté pour continuer"]);
                return;
            }
            const formData = {
                id: UserContext.user.userId,
                billingInfo: {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    phone: phone,
                    company: entreprise,
                    country: country,
                    address: street,
                    address2: streetComplement,
                    postalCode: postalCode,
                    city: city
                },
                deliveryInfo: {
                    firstname: anotherAddress ? livraisonFirstname : firstname,
                    lastname: anotherAddress ? livraisonLastname : lastname,
                    email: anotherAddress ? livraisonEmail : email,
                    phone: anotherAddress ? livraisonPhone : phone,
                    company: anotherAddress ? livraisonEntreprise : entreprise,
                    country: anotherAddress ? livraisonCountry : country,
                    address: anotherAddress ? livraisonStreet : street,
                    address2: anotherAddress ? livraisonStreetComplement : streetComplement,
                    postalCode: anotherAddress ? livraisonPostalCode : postalCode,
                    city: anotherAddress ? livraisonCity : city
                }
            }

            const res = await UpdateUser(formData);
            if (res.status === 404) {
                console.log("User not found");
                setError(["Erreur lors de la mise à jour de l'utilisateur"]);
            } else {
                navigate("/paiement", { state: { from: "/information" } });
            }
        }
    }
    return (
        <>
            <HeaderMenu section={"information"}/>
            <main className={"tunnel_page"}>
                <Notification
                    title={"Erreur de formulaire"}
                    contents={error}
                    setContent={setError}
                    type={"alert"}
                />
                <div className={"tunnel_page__content"}>
                    <div className={"tunnel_page__content__item"}>
                        <h2>Informations de facturation</h2>
                        <InformationForm
                            firstname={firstname}
                            setFirstname={setFirstname}
                            lastname={lastname}
                            setLastname={setLastname}
                            entreprise={entreprise}
                            setEntreprise={setEntreprise}
                            country={country}
                            setCountry={setCountry}
                            street={street}
                            setStreet={setStreet}
                            streetComplement={streetComplement}
                            setStreetComplement={setStreetComplement}
                            postalCode={postalCode}
                            setPostalCode={setPostalCode}
                            city={city}
                            setCity={setCity}
                            phone={phone}
                            setPhone={setPhone}
                            email={email}
                            setEmail={setEmail}
                        />
                        <div className={"tunnel_page__content__item__another_address"}>
                            <SwitchButton
                                name={"anotherAddress"}
                                value={anotherAddress}
                                setValue={setAnotherAddress}

                            />
                            <label htmlFor="anotherAddress">Adresse de livraison différente</label>
                        </div>
                    </div>
                    {anotherAddress && (
                        <div className={"tunnel_page__content__item"}>
                            <h2>Informations de livraison</h2>
                            <InformationForm
                                firstname={livraisonFirstname}
                                setFirstname={setLivraisonFirstname}
                                lastname={livraisonLastname}
                                setLastname={setLivraisonLastname}
                                entreprise={livraisonEntreprise}
                                setEntreprise={setLivraisonEntreprise}
                                country={livraisonCountry}
                                setCountry={setLivraisonCountry}
                                street={livraisonStreet}
                                setStreet={setLivraisonStreet}
                                streetComplement={livraisonStreetComplement}
                                setStreetComplement={setLivraisonStreetComplement}
                                postalCode={livraisonPostalCode}
                                setPostalCode={setLivraisonPostalCode}
                                city={livraisonCity}
                                setCity={setLivraisonCity}
                                phone={livraisonPhone}
                                setPhone={setLivraisonPhone}
                                email={livraisonEmail}
                                setEmail={setLivraisonEmail}
                            />
                        </div>
                    )}
                    <div className={"tunnel_page__content__comment"}>
                        <Input
                            label="Commentaire (facultatif)"
                            type="text"
                            name={"comment"}
                            value={comment}
                            setValue={setComment}
                            placeholder={"Commentaire"}
                        />
                    </div>
                    <div className={"tunnel_page__content__validation"}>
                        <Button onclick={handleSubmit} label={"Aller au paiement"}/>
                    </div>
                </div>
            </main>
            <Footer newsLetter/>
        </>
    )
}