function arttocard(btn) {
  // let node=document.getElementById('cartitem')
  // node.parentElement.parentElement()
  const trnode = btn.parentElement.parentElement;
  const trnodeclone = trnode.cloneNode(true);
  // const btnadd = trnodeclone.getelementbytagname("button");
  //   btnadd[0].innertext = "xoa";
  //   btnadd[0].setatribute("onclick", "removecartitem(this)");

  const cartbody = document.getElementById("cart-body");
  // cartbody.parentElement.parentElement();
  cartbody.appendChild(trnodeclone);
  const carttable = document.getElementById("cartitem");
  carttable.style.display = "table";
  //   carttable.innerHTML = "vet";
  //   document.writeln("fsf");
}
