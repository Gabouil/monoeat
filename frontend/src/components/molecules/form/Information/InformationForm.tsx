import "./InformationForm.scss"
import Input from "../../../atomes/inputs/Input/Input.tsx";

type InformationFormProps = {
    firstname: string;
    setFirstname: React.Dispatch<React.SetStateAction<string>>;
    lastname: string;
    setLastname: React.Dispatch<React.SetStateAction<string>>;
    entreprise: string;
    setEntreprise: React.Dispatch<React.SetStateAction<string>>;
    country: string;
    setCountry: React.Dispatch<React.SetStateAction<string>>;
    street: string;
    setStreet: React.Dispatch<React.SetStateAction<string>>;
    streetComplement: string;
    setStreetComplement: React.Dispatch<React.SetStateAction<string>>;
    postalCode: string;
    setPostalCode: React.Dispatch<React.SetStateAction<string>>;
    city: string;
    setCity: React.Dispatch<React.SetStateAction<string>>;
    phone: string;
    setPhone: React.Dispatch<React.SetStateAction<string>>;
    email: string;
    setEmail: React.Dispatch<React.SetStateAction<string>>;
}
export default function InformationForm({
                                            firstname,
                                            setFirstname,
                                            lastname,
                                            setLastname,
                                            entreprise,
                                            setEntreprise,
                                            country,
                                            setCountry,
                                            street,
                                            setStreet,
                                            streetComplement,
                                            setStreetComplement,
                                            postalCode,
                                            setPostalCode,
                                            city,
                                            setCity,
                                            phone,
                                            setPhone,
                                            email,
                                            setEmail
                                        }: InformationFormProps) {

    return (
        <form className="information_form">
            <div className="information_form--row">
                <Input
                    label="Prénom"
                    type="text"
                    name={"firstname"}
                    value={firstname}
                    setValue={setFirstname}
                    placeholder={"Prénom"}
                    required={true}
                />
                <Input
                    label="Nom"
                    type="text"
                    name={"lastname"}
                    value={lastname}
                    setValue={setLastname}
                    placeholder={"Nom"}
                    required={true}
                />
            </div>
            <Input
                label="Entreprise (facultatif)"
                type="text"
                name={"entreprise"}
                value={entreprise}
                setValue={setEntreprise}
                placeholder={"Entreprise"}
            />
            <Input
                label="Pays"
                type="text"
                name={"country"}
                value={country}
                setValue={setCountry}
                placeholder={"Pays"}
                required={true}
            />
            <Input
                label="Adresse"
                type="text"
                name={"street"}
                value={street}
                setValue={setStreet}
                placeholder={"Adresse"}
                required={true}
            />
            <Input
                label="Complément d'adresse (facultatif)"
                type="text"
                name={"streetComplement"}
                value={streetComplement}
                setValue={setStreetComplement}
                placeholder={"Complément d'adresse"}
            />
            <Input
                label="Code postal"
                type="text"
                name={"postalCode"}
                value={postalCode}
                setValue={setPostalCode}
                placeholder={"Code postal"}
                required={true}
            />
            <Input
                label="Ville"
                type="text"
                name={"city"}
                value={city}
                setValue={setCity}
                placeholder={"Ville"}
                required={true}
            />
            <Input
                label="Téléphone"
                type="text"
                name={"phone"}
                value={phone}
                setValue={setPhone}
                placeholder={"Téléphone"}
                required={true}
            />
            <Input
                label="Email"
                type="email"
                name={"email"}
                value={email}
                setValue={setEmail}
                placeholder={"Email"}
                required={true}
            />
        </form>
    )
}