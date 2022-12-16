import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getAccount } from '../../_utils/auth/auth.functions';
import { NoUserFound } from "../infos/NotFound";
import Account from './Account';
import AccountPostContainer from './AccountPostContainer';

const Profil = ({...params}) => {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [account, setAccount] = useState([]);
  const { id } = useParams();
  const [refetch, setRefetch] = useState(false);

  async function fetchAccount() {
    getAccount(id).then(
      (res) => {
        if (res.status === 200) {
          res.json().then((result) => {
            setAccount(result);
            setIsLoaded(true);
          });
        } else if (res.status === 404) {
          setError(404);
          setIsLoaded(true);
        } else {
          setError(res.statusText);
          setIsLoaded(true);
        }
      },
      (error) => {
        setError(error);
        setIsLoaded(true);
      }
    );
  }
  useEffect(() => {
    fetchAccount();
  }, [refetch]);

  const handlePost = () => {
    fetchAccount();
  };

  const handlerDeletedAccount = () => {
    setAccount((account) => account = []);
    setIsLoaded(false);
    setRefetch(true);
  };
  if (error && error === 404) {
    return (
      <div>
        <NoUserFound />
      </div>
    )
  } else if (error) {
    return <div>Erreur : {error}</div>
  } else if (!isLoaded) {
    return <div> Chargement...</div>
  } else 
  return (
    account && (
      <React.Fragment>
        <section className='profilContainer'>
        {!params.editor ? (
          <Account 
          {...account}
          onLogout={params.onLogout}
          onDeleteAccount={handlerDeletedAccount}
          />
        ): null}
        </section>
        {!params.editor ? <AccountPostContainer /> : null}
    </React.Fragment>
  )
  )
}

export default Profil