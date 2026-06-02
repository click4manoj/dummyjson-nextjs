import { getCurrentUser } from "@/app/lib/auth";
import Image from "next/image";
import { Suspense } from "react";
import {ProfileSkeleton} from '@/app/ui/skeletons'
export default async function Profiles() {
    const user = await getCurrentUser();
    return( <>
     
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      <Suspense fallback={<ProfileSkeleton />}>
    <div style={{ maxWidth: "800px", margin: "auto", padding: "20px" }}>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: "10px",
          padding: "20px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
      >
        <h1 className="text-2xl font-semibold">Profile</h1>

        <div style={{ textAlign: "center" }}>
          <Image
            src={user.image}
            alt={user.firstName}
            width={120} 
            height={120}
            style={{ borderRadius: "50%", width: "120px" }}
          />
          <h2>
            {user.firstName} {user.lastName}
          </h2>
          <p>Role: {user.role}</p>
        </div>

        <hr />

        <h3>Personal Info</h3>
        <p><strong>Maiden Name:</strong> {user.maidenName}</p>
        <p><strong>Age:</strong> {user.age}</p>
        <p><strong>Gender:</strong> {user.gender}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Birth Date:</strong> {user.birthDate}</p>
        <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
        <p><strong>Height:</strong> {user.height} cm</p>
        <p><strong>Weight:</strong> {user.weight} kg</p>
        <p><strong>Eye Color:</strong> {user.eyeColor}</p>
        <p>
          <strong>Hair:</strong> {user.hair.color} ({user.hair.type})
        </p>

        <hr />

        <h3>Address</h3>
        <p>{user.address.address}</p>
        <p>
          {user.address.city}, {user.address.state} (
          {user.address.stateCode})
        </p>
        <p>{user.address.country}</p>
        <p>Postal Code: {user.address.postalCode}</p>
        <p>
          Coordinates: {user.address.coordinates.lat},{" "}
          {user.address.coordinates.lng}
        </p>

        <hr />

        <h3>Education</h3>
        <p>{user.university}</p>

        <hr />

        <h3>Company</h3>
        <p><strong>Name:</strong> {user.company.name}</p>
        <p><strong>Department:</strong> {user.company.department}</p>
        <p><strong>Title:</strong> {user.company.title}</p>
        <p>
          <strong>Office Address:</strong>{" "}
          {user.company.address.address},{" "}
          {user.company.address.city},{" "}
          {user.company.address.country}
        </p>

        <hr />

        <h3>Bank Details</h3>
        <p><strong>Card Type:</strong> {user.bank.cardType}</p>
        <p><strong>Card Number:</strong> {user.bank.cardNumber}</p>
        <p><strong>Card Expiry:</strong> {user.bank.cardExpire}</p>
        <p><strong>Currency:</strong> {user.bank.currency}</p>
        <p><strong>IBAN:</strong> {user.bank.iban}</p>

        <hr />

        <h3>Crypto</h3>
        <p><strong>Coin:</strong> {user.crypto.coin}</p>
        <p><strong>Wallet:</strong> {user.crypto.wallet}</p>
        <p><strong>Network:</strong> {user.crypto.network}</p>

        <hr />

        <h3>System Info</h3>
        <p><strong>IP:</strong> {user.ip}</p>
        <p><strong>MAC Address:</strong> {user.macAddress}</p>
        <p><strong>User Agent:</strong> {user.userAgent}</p>
        <p><strong>EIN:</strong> {user.ein}</p>
        <p><strong>SSN:</strong> {user.ssn}</p>
      </div>
    </div>
</Suspense>
    </> );
}