from django.test import TestCase
from models import *
import datetime

# Create your tests here.


class AddressModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):  # Create two objects for  testing
        Address.objects.create(
            zip_code='123456', city='test1', country='test1', address1='street', address2='building')
        Address.objects.create(
            zip_code='654321', city='test2', country='test2', address1='street', address2='street')

    # Test that the country is saved in the db as expected. Passes for 1, fails for 2
    def test_country_content(self):
        adr = Address.objects.get(id=1)
        expected_object_name = f'{adr.country}'
        self.assertEquals(expected_object_name, 'test1')

    # Test that the city is saved in the db as expected. Passes for 2, fails for 1
    def test_city_content(self):
        adr = Address.objects.get(id=2)
        expected_object_name = f'{adr.city}'
        self.assertEquals(expected_object_name, 'test2')

    # Test that the zip code is saved in the db as expected. Passes for 1, fails for 2
    def test_zip_content(self):
        adr = Address.objects.get(id=1)
        expected_object_name = f'{adr.zip_code}'
        self.assertEquals(expected_object_name, '123456')

    # Test that the address lines are store properly. Passes for 2, fails for 1
    def test_lines_content(self):
        adr = Address.objects.get(id=2)
        self.assertEquals(adr.address1, adr.address2)

    def test_get_all(self):  # Prints all objects city and country.
        adrs = Address.objects.all()
        for a in adrs:
            adr = "City- " + a.city + ", Country- " + a.country
            print("Address: " + adr)


class CompanyModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):  # Create test data
        adr = Address.objects.create(
            zip_code="111111", city="San Fransico", country="USA")
        Company.objects.create(name="Apple", address=adr,
                               description="Software Company")
        Company.objects.create(name="Intel", address=adr,
                               description="Hardware Company")

    # Test that the company name is store properly. Passes for 1, fails for 2
    def test_name_content(self):
        com = Company.objects.get(id=1)
        expected_object_name = f'{com.name}'
        self.assertEquals(expected_object_name, 'Apple')

    # Test that company address is stored properly. Passes for 1,1 and 2,1, fails for 1,2 and 2,2
    def test_address_content(self):
        com = Company.objects.get(id=1)
        expected_object = com.address
        self.assertEquals(expected_object, Address.objects.get(id=1))

    # Test that description is stored properly. Passes for 1, fails for 2
    def test_description_content(self):
        com = Company.objects.get(id=1)
        expected_object_name = f'{com.description}'
        self.assertEquals(expected_object_name, 'Software Company')


class AssociationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):  # Create test data
        adr = Address.objects.create(
            zip_code="111111", city="San Fransico", country="USA")
        Association.objects.create(
            name="FAANG", description="Software Giants", address=adr,)
        Association.objects.create(
            name="FAANT", description="Software Giants", address=adr,)

    # Test that the name is create properly. Pass
    def test_name_content(self):
        asc1 = Association.objects.get(id=1)
        asc2 = Association.objects.get(id=2)
        names = ['FAANG', 'FAANT']
        self.assertEquals(names[0], asc1.name)
        self.assertEquals(names[1], asc2.name)
        self.assertNotEquals(asc2.name, asc1.name)

    # Test that the description is created properly, should pass
    def test_description_content(self):
        asc1 = Association.objects.get(id=1)
        asc2 = Association.objects.get(id=2)
        self.assertEquals(asc1.description, asc2.description)


class ProfileModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):  # Create data for tests
        Profile.objects.create(
            user=User.objects.create(username="Test User"), name='Tester', last_name='Testington', email='test@test.test', address=Address.objects.create(
                zip_code="111111", city="San Fransico", country="USA"),)
        Profile.objects.create(
            user=User.objects.create(username="User Test"), name='Tester', last_name='Testington', email='test@test.test', address=Address.objects.create(
                zip_code="111111", city="San Fransico", country="USA"),)

    def test_user_content(self):  # Test that proper user is assigned
        usr = User.objects.get(id=1)
        app1 = Profile.objects.get(id=1)
        self.assertEquals(app1.user, usr)

    def test_name_content(self):  # Test that the name is assigned correctly
        app1 = Profile.objects.get(id=1)
        app2 = Profile.objects.get(id=2)
        self.assertIn(app1.name, app2.name)

    # Test that the last name is assigned correctly
    def test_last_name_content(self):
        app1 = Profile.objects.get(id=1)
        app2 = Profile.objects.get(id=2)
        self.assertNotEquals(app1.last_name, app2.last_name)

    def test_email_content(self):  # Test that the email is assigned correctly
        app1 = Profile.objects.get(id=1)
        app2 = Profile.objects.get(id=2)
        self.assertIn(app1.email, app2.email)


class CommitteeModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):  # Create test data
        com = Committee.objects.create(name="Test Group")
        com.members.add(
            Profile.objects.create(user=User.objects.create(username="Test Users"), name='Tester', last_name='Testington', email='test@test.test', address=Address.objects.create(
                zip_code="111111", city="San Fransico", country="USA"),),
            Profile.objects.create(user=User.objects.create(username="User Test"), name='Testy', last_name='Testington', email='test@test.test', address=Address.objects.create(
                zip_code="111111", city="San Fransico", country="USA"),))

    def test_name_content(self):  # Test that the committe name is created correctly
        com = Committee.objects.get(id=1)
        expected_object_name = f'{com.name}'
        self.assertEquals(expected_object_name, 'Test Group')

    # Test that the member names are created correctly
    def test_member_content(self):
        com = Committee.objects.get(id=1)
        app1 = Profile.objects.get(id=1)
        app2 = Profile.objects.get(id=2)
        apps = [app1.name, app2.name]
        mems = list(com.members.all())
        self.assertIn(mems[0].name, apps)


class ListingModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):  # Create test data
        com = Committee.objects.create(name="Test Group")
        co = Company.objects.create(name="Apple", address=Address.objects.create(
            zip_code="111111", city="San Fransico", country="USA"), description="Software Company")
        Listing.objects.create(
            title='Job Offer', description='Only the best', committee=com, company=co)

    def test_title_content(self):  # Check that title was created correctly
        listing = Listing.objects.get(id=1)
        expected_object_name = f'{listing.title}'
        self.assertEquals(expected_object_name, 'Job Offer')

    # Check that the description was created correctly
    def test_description_content(self):
        listing = Listing.objects.get(id=1)
        expected_object_name = f'{listing.description}'
        self.assertEquals(expected_object_name, 'Only the best')

    # Check the default date was create 31 days from positing time
    def test_date_content(self):
        listing = Listing.objects.get(id=1)
        date = str(datetime.datetime.now()+datetime.timedelta(days=31))
        self.assertIn(str(listing.date), date)

    def test_company_content(self):  # Check that the company was created properly
        listing = Listing.objects.get(id=1)
        co = Company.objects.get(id=1)
        expected_object = listing.company
        self.assertEquals(expected_object, co)


class ApplicationModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):  # Create test data
        com = Committee.objects.create(name="Test Group")
        co = Company.objects.create(name="Apple", address=Address.objects.create(
            zip_code="111111", city="San Fransico", country="USA"), description="Software Company")
        offer = Listing.objects.create(
            title='Job Offer', description='Only the best', committee=com, company=co)
        app = Profile.objects.create(user=User.objects.create(username="Test User"), name='Tester', last_name='Testington', email='test@test.test', address=Address.objects.create(
            zip_code="111111", city="San Fransico", country="USA"),)
        test = Application.objects.create(listing=offer)
        test.applicants.add(app)

    # Test that the applicants are added correctly
    def test_applicants_content(self):
        app = Application.objects.get(id=1)
        name = list(app.applicants.all())[0].name
        self.assertIn('Tester', name)

    # Test that the application is linked to the proper offer
    def test_listing_content(self):
        app = Application.objects.get(id=1)
        offer = Listing.objects.get(id=1)
        self.assertEquals(app.listing, offer)

    def test_status_content(self):  # Test that the default status is set to pending
        app = Application.objects.get(id=1)
        self.assertIn('Pending', app.status)
