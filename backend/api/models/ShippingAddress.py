from django.db import models
from .City import City
from .Department import Department
from .SoftDeleteModel import SoftDeleteModel
from .SoftDeleteManager import SoftDeleteManager


class ShippingAddressManager(models.Manager):
    """
    Manager for the ShippingAddress model.
    """

    def create_shipping_address(self, address, department, **extra_fields):
        """
        Create a new ShippingAddress.

        Arguments:
            department:
            address (str): address of the shipping.
            **extra_fields: Extra fields to add to the ShippingAddress instance.

        Returns:
            ShippingAddress: The created ShippingAddress instance.
        """
        if not address:
            raise ValueError('You must put an address to the shipping')
        id = f'address{ShippingAddress.objects.all().count() + 1}'
        shipping_address = self.model(id=id,
                                      address=address,
                                      department=department,
                                      **extra_fields)
        shipping_address.save(using=self._db)
        return shipping_address


class ShippingAddress(SoftDeleteModel):
    """
    Model for the shipping_address.
    """
    id = models.CharField(primary_key=True, max_length=12, db_column='address_id')
    address = models.CharField(max_length=255)
    zipCode = models.CharField(max_length=6, db_column='zip_code')
    neighborhood = models.CharField(max_length=255)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)

    objects = ShippingAddressManager()
    all_objects = SoftDeleteManager()

    class Meta:
        managed = False
        db_table = 'api_shippingaddress'

    def __str__(self):
        return self.address
